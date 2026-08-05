import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/db";

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

      // Update user subscription status
      await db.collection("users").updateOne(
        { email },
        {
          $set: {
            subscriptionPlan:   plan,
            subscriptionActive: true,
            subscriptionRef:    reference,
            subscribedAt:       new Date(),
            // Amount is in kobo (NGN) — divide by 100
            amountPaid:         amount / 100,
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
    } catch (err) {
      console.error("Webhook DB error:", err);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
