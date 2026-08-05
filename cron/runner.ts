/**
 * Subscription Expiry Cron Runner
 *
 * Run with: tsx cron/runner.ts
 *
 * Schedule: "0 23 * * *" = 23:00 UTC every day = 00:00 WAT (West Africa Time, UTC+1)
 *
 * This process runs alongside the Next.js server in production.
 * On Coolify, the `start` script launches both via `concurrently`.
 */

import cron from "node-cron";
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

// Load environment variables from .env.local (production: set these in Coolify dashboard)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("[Cron] MONGODB_URI is not set. Exiting.");
  process.exit(1);
}

async function expireSubscriptions() {
  const client = new MongoClient(MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db("kstudy");

    // Find subscriptions older than 30 days from their subscribedAt timestamp
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Collect emails for the audit log
    const expiredUsers = await db
      .collection("user")
      .find({
        subscriptionActive: true,
        subscribedAt: { $lte: thirtyDaysAgo },
      })
      .project({ email: 1, _id: 0 })
      .toArray();

    if (expiredUsers.length === 0) {
      console.log("[Cron] expire-subscriptions: No expired subscriptions found.");
      return;
    }

    // Deactivate expired subscriptions
    const result = await db.collection("user").updateMany(
      {
        subscriptionActive: true,
        subscribedAt: { $lte: thirtyDaysAgo },
      },
      {
        $set: {
          subscriptionActive: false,
          subscriptionPlan: "free",
          expiredAt: new Date(),
        },
      }
    );

    const expiredEmails = expiredUsers.map((u) => u.email);

    // Write audit log entry
    await db.collection("subscription_logs").insertOne({
      type: "mass_expiry",
      expiredAt: new Date(),
      count: result.modifiedCount,
      emails: expiredEmails,
    });

    console.log(
      `[Cron] expire-subscriptions: Expired ${result.modifiedCount} subscription(s).`,
      expiredEmails
    );
  } catch (err) {
    console.error("[Cron] expire-subscriptions: DB error:", err);
  } finally {
    await client.close();
  }
}

// ── Schedule ─────────────────────────────────────────────────────────────────
// Cron timezone: "Africa/Lagos" = WAT (UTC+1). Runs at 00:00 WAT daily.
cron.schedule(
  "0 0 * * *",
  async () => {
    console.log(`[Cron] Running expire-subscriptions at ${new Date().toISOString()}`);
    await expireSubscriptions();
  },
  {
    timezone: "Africa/Lagos",
  }
);

console.log("[Cron] Subscription expiry scheduler started.");
console.log("[Cron] Will run daily at 00:00 WAT (Africa/Lagos timezone).");
