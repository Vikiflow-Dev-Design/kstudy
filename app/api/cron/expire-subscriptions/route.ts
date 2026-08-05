import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

/**
 * Subscription Expiry Cron Job
 *
 * Runs daily at 23:00 UTC = 00:00 WAT (West Africa Time, UTC+1).
 *
 * Finds all users whose subscription was activated more than 31 days ago
 * (30-day billing cycle + 1 day grace) and marks them as inactive (free tier).
 *
 * Secured with CRON_SECRET to prevent unauthorized calls.
 */
export async function GET(req: NextRequest) {
  // ── Security: only allow requests with the correct secret header ──────────
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db     = client.db("kstudy");

    // Subscriptions older than 30 days from their subscribedAt timestamp
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Find all expired subscriptions for logging
    const expiredUsers = await db.collection("user").find({
      subscriptionActive: true,
      subscribedAt: { $lte: thirtyDaysAgo },
    }).toArray();

    if (expiredUsers.length === 0) {
      console.log("[Cron] expire-subscriptions: No expired subscriptions found.");
      return NextResponse.json({ expired: 0, message: "No expired subscriptions." });
    }

    // Deactivate all expired subscriptions
    const result = await db.collection("user").updateMany(
      {
        subscriptionActive: true,
        subscribedAt: { $lte: thirtyDaysAgo },
      },
      {
        $set: {
          subscriptionActive: false,
          subscriptionPlan:   "free",
          expiredAt:          new Date(),
        },
      }
    );

    // Log each expired user for audit trail
    const expiredEmails = expiredUsers.map((u) => u.email);
    await db.collection("subscription_logs").insertOne({
      type:      "mass_expiry",
      expiredAt: new Date(),
      count:     result.modifiedCount,
      emails:    expiredEmails,
    });

    console.log(`[Cron] expire-subscriptions: Expired ${result.modifiedCount} subscription(s).`);

    return NextResponse.json({
      success: true,
      expired: result.modifiedCount,
      emails:  expiredEmails,
    });
  } catch (err) {
    console.error("[Cron] expire-subscriptions: DB error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
