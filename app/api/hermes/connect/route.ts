import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { token, code } = await req.json();

    if (!token || !code) {
      return NextResponse.json({ error: "Missing bot token or access code." }, { status: 400 });
    }

    if (!token.includes(":")) {
      return NextResponse.json({ error: "Invalid Telegram bot token format." }, { status: 400 });
    }

    const client = await clientPromise;
    const db     = client.db("kstudy");

    // Format code: KSTUDY-XXXXXX (case-insensitive & whitespace trimmed)
    const formattedCode = code.trim().toUpperCase();

    // Verify user by accessCode
    const user = await db.collection("user").findOne({ accessCode: formattedCode });

    if (!user) {
      return NextResponse.json({ error: "Invalid access code. Please check your email or contact support." }, { status: 404 });
    }

    // Verify subscription status
    if (!user.subscriptionActive) {
      return NextResponse.json({ error: "Your subscription is not active. Please upgrade or subscribe first." }, { status: 403 });
    }

    // Save Telegram bot connection to the user document
    await db.collection("user").updateOne(
      { _id: user._id },
      {
        $set: {
          telegramBotToken:     token.trim(),
          telegramBotConnected: true,
          telegramBotLinkedAt:  new Date(),
        }
      }
    );

    return NextResponse.json({
      success: true,
      message: "Hermes connected to your Telegram bot successfully!",
      email: user.email,
    });

  } catch (err) {
    console.error("Hermes connection endpoint error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
