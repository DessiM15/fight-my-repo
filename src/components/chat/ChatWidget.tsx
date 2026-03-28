"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { cn, VANITY_HREF } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════ */
/*  CONVERSATION STATE MACHINE                                         */
/* ═══════════════════════════════════════════════════════════════════ */

interface ChatMessage {
  id: string;
  from: "bot" | "user";
  text: string;
}

interface ChatNode {
  messages: string[];
  choices?: { label: string; next: string }[];
  isEnd?: boolean;
  endAction?: "form" | "phone";
}

const CHAT_FLOW: Record<string, ChatNode> = {
  start: {
    messages: [
      "Hi there! I'm here to help you figure out if you have a case.",
      "Which of these best describes your situation?",
    ],
    choices: [
      { label: "My car was repossessed", next: "repo_start" },
      { label: "I have credit report errors", next: "credit_start" },
      { label: "I'm being harassed by debt collectors", next: "debt_start" },
      { label: "I'm military / SCRA issue", next: "scra_start" },
    ],
  },

  // ── Repossession path ──
  repo_start: {
    messages: [
      "I'm sorry to hear about your repossession. Let me ask a few questions to see if you have a case.",
      "When was your vehicle repossessed?",
    ],
    choices: [
      { label: "Within the last 30 days", next: "repo_notice" },
      { label: "1-6 months ago", next: "repo_notice" },
      { label: "More than 6 months ago", next: "repo_notice" },
      { label: "It hasn't happened yet (threatened)", next: "repo_threatened" },
    ],
  },
  repo_notice: {
    messages: ["Did you receive any written notice before the repossession?"],
    choices: [
      { label: "No, no notice at all", next: "repo_strong" },
      { label: "Yes, I received a notice", next: "repo_breach" },
      { label: "I'm not sure", next: "repo_strong" },
    ],
  },
  repo_breach: {
    messages: [
      "Did anything unusual happen during the repossession? For example, threats, entering a locked garage, or a confrontation?",
    ],
    choices: [
      { label: "Yes, there was a confrontation or force", next: "repo_strong" },
      { label: "They entered my locked garage", next: "repo_strong" },
      { label: "No, it was peaceful", next: "repo_deficiency" },
    ],
  },
  repo_deficiency: {
    messages: ["Are they now suing you or demanding a deficiency balance (the remaining amount after the car was sold)?"],
    choices: [
      { label: "Yes, they're coming after me for money", next: "repo_strong" },
      { label: "No", next: "repo_maybe" },
    ],
  },
  repo_strong: {
    messages: [
      "Based on what you've told me, it sounds like you may have a strong case!",
      "Cases like yours typically settle for $10,000 to $100,000+.",
      "Would you like a free case evaluation from our attorneys?",
    ],
    choices: [
      { label: "Yes, evaluate my case", next: "end_form" },
      { label: "I'd rather call", next: "end_phone" },
    ],
  },
  repo_maybe: {
    messages: [
      "There may still be violations we can identify. Every case is different.",
      "I'd recommend getting a free evaluation from our attorneys. Would you like to proceed?",
    ],
    choices: [
      { label: "Yes, let's do it", next: "end_form" },
      { label: "I'd rather call", next: "end_phone" },
    ],
  },
  repo_threatened: {
    messages: [
      "If repossession is being threatened, acting quickly is important. There may be steps we can take to protect your vehicle.",
      "Would you like a free consultation?",
    ],
    choices: [
      { label: "Yes, I need help now", next: "end_form" },
      { label: "I'd rather call", next: "end_phone" },
    ],
  },

  // ── Credit report path ──
  credit_start: {
    messages: [
      "Credit report errors can cause serious damage. Let me ask a few questions.",
      "What kind of errors are on your report?",
    ],
    choices: [
      { label: "Wrong account information", next: "credit_dispute" },
      { label: "Accounts that aren't mine", next: "credit_dispute" },
      { label: "Identity theft / mixed file", next: "credit_strong" },
      { label: "Outdated negative items", next: "credit_dispute" },
    ],
  },
  credit_dispute: {
    messages: ["Have you disputed the errors with the credit bureau(s)?"],
    choices: [
      { label: "Yes, and they didn't fix it", next: "credit_strong" },
      { label: "Yes, but it came back as verified", next: "credit_strong" },
      { label: "No, I haven't disputed yet", next: "credit_recommend" },
    ],
  },
  credit_strong: {
    messages: [
      "This sounds like a potential FCRA violation. You may be entitled to $1,000 to $50,000+ in damages.",
      "Would you like our FCRA attorneys to review your case?",
    ],
    choices: [
      { label: "Yes, review my case", next: "end_form" },
      { label: "I'd rather call", next: "end_phone" },
    ],
  },
  credit_recommend: {
    messages: [
      "We recommend disputing the errors first, but our attorneys can also guide you through that process.",
      "Would you like a free consultation?",
    ],
    choices: [
      { label: "Yes, help me get started", next: "end_form" },
      { label: "I'd rather call", next: "end_phone" },
    ],
  },

  // ── Debt collection path ──
  debt_start: {
    messages: [
      "Debt collector harassment is illegal. Let me ask a few questions.",
      "What are they doing?",
    ],
    choices: [
      { label: "Calling excessively", next: "debt_strong" },
      { label: "Threatening arrest or jail", next: "debt_strong" },
      { label: "Calling my workplace", next: "debt_strong" },
      { label: "Trying to collect a debt I don't owe", next: "debt_strong" },
    ],
  },
  debt_strong: {
    messages: [
      "What you're describing likely violates the Fair Debt Collection Practices Act (FDCPA).",
      "You may be entitled to $1,000+ in statutory damages plus actual damages.",
      "Would you like a free case evaluation?",
    ],
    choices: [
      { label: "Yes, evaluate my case", next: "end_form" },
      { label: "I'd rather call", next: "end_phone" },
    ],
  },

  // ── SCRA path ──
  scra_start: {
    messages: [
      "Thank you for your service. The SCRA provides important protections.",
      "What happened?",
    ],
    choices: [
      { label: "Vehicle repossessed during active duty", next: "scra_strong" },
      { label: "Interest rate not reduced to 6%", next: "scra_strong" },
      { label: "Foreclosure during service", next: "scra_strong" },
      { label: "Other SCRA violation", next: "scra_strong" },
    ],
  },
  scra_strong: {
    messages: [
      "SCRA violations are taken very seriously by courts. These cases often result in $10,000 to $100,000+ in damages.",
      "Would you like our military rights attorneys to review your case?",
    ],
    choices: [
      { label: "Yes, review my case", next: "end_form" },
      { label: "I'd rather call", next: "end_phone" },
    ],
  },

  // ── End nodes ──
  end_form: {
    messages: [
      "Great! Click below to fill out our quick intake form and an attorney will review your case within 24 hours.",
    ],
    isEnd: true,
    endAction: "form",
  },
  end_phone: {
    messages: [
      `Call us now for a free consultation. We're available to help.`,
    ],
    isEnd: true,
    endAction: "phone",
  },
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  TYPING INDICATOR                                                   */
/* ═══════════════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[#D4A843]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  CHAT WIDGET                                                        */
/* ═══════════════════════════════════════════════════════════════════ */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentNode, setCurrentNode] = useState<string>("start");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingMessages, setPendingMessages] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Display bot messages one at a time with typing effect
  const showBotMessages = useCallback(
    (msgs: string[]) => {
      setPendingMessages(msgs);
    },
    []
  );

  useEffect(() => {
    if (pendingMessages.length === 0) return;

    setIsTyping(true);
    const timeout = setTimeout(() => {
      setIsTyping(false);
      const [next, ...rest] = pendingMessages;
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}-${Math.random()}`, from: "bot", text: next },
      ]);
      setPendingMessages(rest);
    }, 800 + Math.random() * 400);

    return () => clearTimeout(timeout);
  }, [pendingMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Initialize on open
  useEffect(() => {
    if (isOpen && !initialized) {
      setInitialized(true);
      const node = CHAT_FLOW.start;
      showBotMessages(node.messages);
    }
  }, [isOpen, initialized, showBotMessages]);

  const handleChoice = (label: string, nextNode: string) => {
    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, from: "user", text: label },
    ]);

    setCurrentNode(nextNode);
    const node = CHAT_FLOW[nextNode];
    if (node) {
      showBotMessages(node.messages);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setCurrentNode("start");
    setPendingMessages([]);
    setIsTyping(false);
    const node = CHAT_FLOW.start;
    showBotMessages(node.messages);
  };

  const node = CHAT_FLOW[currentNode];
  const showChoices =
    !isTyping && pendingMessages.length === 0 && node?.choices;
  const isEndNode = !isTyping && pendingMessages.length === 0 && node?.isEnd;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-[#D4A843] text-[#0A0A0A] shadow-lg shadow-[#D4A843]/30 flex items-center justify-center hover:bg-[#D4A843]/90 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0A0A0A] px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D4A843] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#0A0A0A]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    Case Evaluation
                  </p>
                  <p className="text-[#8A8A8A] text-xs">
                    Powered by Fight My Repo
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8A8A8A] hover:text-white transition-colors p-1"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.from === "bot"
                      ? "bg-gray-100 text-[#0A0A0A] rounded-bl-md self-start"
                      : "bg-[#D4A843] text-[#0A0A0A] rounded-br-md ml-auto"
                  )}
                >
                  {msg.text}
                </div>
              ))}

              {isTyping && (
                <div className="bg-gray-100 rounded-2xl rounded-bl-md max-w-[85%] self-start">
                  <TypingIndicator />
                </div>
              )}

              {/* Choice Buttons */}
              {showChoices && node.choices && (
                <div className="space-y-2 pt-2">
                  {node.choices.map((choice) => (
                    <button
                      key={choice.label}
                      onClick={() => handleChoice(choice.label, choice.next)}
                      className="w-full text-left px-4 py-2.5 rounded-xl border border-[#D4A843]/30 bg-[#D4A843]/5 text-[#0A0A0A] text-sm font-medium hover:bg-[#D4A843]/15 hover:border-[#D4A843]/50 transition-all flex items-center justify-between gap-2"
                    >
                      {choice.label}
                      <ChevronRight className="w-4 h-4 text-[#D4A843] flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {/* End Actions */}
              {isEndNode && (
                <div className="space-y-3 pt-2">
                  {node.endAction === "form" && (
                    <a
                      href="/#hero-form"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#D4A843] text-[#0A0A0A] font-bold text-sm hover:bg-[#D4A843]/90 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Fill Out Intake Form
                    </a>
                  )}
                  {node.endAction === "phone" && (
                    <a
                      href={VANITY_HREF}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-[#C1121F] text-white font-bold text-sm hover:bg-[#C1121F]/90 transition-colors"
                    >
                      Call Us Now
                    </a>
                  )}
                  <button
                    onClick={handleRestart}
                    className="w-full text-center text-xs text-[#8A8A8A] hover:text-[#D4A843] transition-colors py-2"
                  >
                    Start Over
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-gray-100 px-4 py-2.5">
              <p className="text-[10px] text-[#8A8A8A] text-center">
                This is not legal advice. For a full evaluation, submit a form
                or call us.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
