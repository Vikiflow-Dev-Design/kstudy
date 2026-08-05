import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/db";
import { sendAccessCodeEmail } from "@/lib/mail";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-paystack-signature") ?? "";

  // Verify webhook signature
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(rawBody)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const { customer, metadata, amount, reference } = event.data;
    const email = customer?.email;
    const plan  = metadata?.plan ?? "student";

    try {
      const client = await clientPromise;
      const db     = client.db("kstudy");

      // Generate a unique 6-character alphanumeric code: e.g. KSTUDY-Z7B8P9
      const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
      const accessCode = `KSTUDY-${randomPart}`;

      // Get user name for personalization if user exists
      const user = await db.collection("user").findOne({ email });
      const userName = user?.name;

      // Update user subscription status & assign access code
      await db.collection("user").updateOne(
        { email },
        {
          $set: {
            subscriptionPlan:   plan,
            subscriptionActive: true,
            subscriptionRef:    reference,
            subscribedAt:       new Date(),
            // Amount is in kobo (NGN) — divide by 100
            amountPaid:         amount / 100,
            accessCode:         accessCode,
          },
        }
      );

      // Log the transaction
      await db.collection("transactions").insertOne({
        email,
        reference,
        plan,
        amount:    amount / 100,
        currency:  event.data.currency,
        status:    "success",
        createdAt: new Date(),
      });

      // Send confirmation email containing the access code and setup steps
      await sendAccessCodeEmail(email, accessCode, userName);

    } catch (err) {
      console.error("Webhook DB/Mail error:", err);
      return NextResponse.json({ error: "Server error during webhook processing" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
