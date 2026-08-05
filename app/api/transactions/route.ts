import { getAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET(req: NextRequest) {
  const auth    = await getAuth();
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db     = client.db("kstudy");

    // Fetch user transactions from the db
    const transactions = await db
      .collection("transactions")
      .find({ email: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ transactions });
  } catch (err) {
    console.error("Failed to fetch transactions:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
