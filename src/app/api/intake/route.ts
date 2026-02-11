import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const intakeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  state: z.string().min(1, "Please select your state"),
  // Optional fields for extended forms
  caseType: z.string().optional(),
  timeline: z.string().optional(),
  vehicleType: z.string().optional(),
  violations: z.array(z.string()).optional(),
  lenderName: z.string().optional(),
  description: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bestTimeToCall: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = intakeSchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const data = result.data;

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from("leads").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        state: data.state,
        case_type: data.caseType || null,
        timeline: data.timeline || null,
        vehicle_type: data.vehicleType || null,
        violations: data.violations || null,
        lender_name: data.lenderName || null,
        description: data.description || null,
        first_name: data.firstName || null,
        last_name: data.lastName || null,
        best_time_to_call: data.bestTimeToCall || null,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json(
          { success: false, message: "Something went wrong. Please try again." },
          { status: 500 }
        );
      }
    } else {
      // Demo mode: log to console
      console.log("--- New Lead (Demo Mode - Supabase not configured) ---");
      console.log(JSON.stringify(data, null, 2));
      console.log("------------------------------------------------------");
    }

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Intake API error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
