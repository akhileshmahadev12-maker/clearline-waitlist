import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const businessName =
      typeof body.businessName === "string" ? body.businessName.trim() : null;

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("waitlist").insert({
      email,
      business_name: businessName || null,
    });

    if (error) {
      // Postgres unique_violation code when the same email signs up twice
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "This email is already on the early access list.", alreadyJoined: true },
          { status: 200 }
        );
      }

      console.error("Supabase waitlist insert error:", error);
      return NextResponse.json(
        { error: "Could not save your signup right now. Try again shortly." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You are on the early access list.", alreadyJoined: false },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
