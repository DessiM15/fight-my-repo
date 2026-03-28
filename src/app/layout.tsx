import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Fight My Repo - Wrongful Repossession Attorneys | Free Case Review",
    template: "%s | Fight My Repo",
  },
  description:
    "Wrongfully repossessed? Fight My Repo fights for consumers nationwide. Sue for $10,000 - $100,000+. Free case review. Over $1 billion in debt canceled since 2014.",
  keywords: [
    "wrongful repossession",
    "fight my repo",
    "debt collection violations",
    "FDCPA attorney",
    "repossession lawyer",
    "consumer protection",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Fight My Repo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
