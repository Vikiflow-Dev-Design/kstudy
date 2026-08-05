"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type Transaction = {
  _id:       string;
  email:     string;
  reference: string;
  plan:      string;
  amount:    number;
  currency:  string;
  status:    string;
  createdAt: string;
};

/* ─── Topbar ─────────────────────────────────────────────────── */
function Topbar({ userName }: { userName?: string }) {
  const router = useRouter();
  async function handleSignOut() {
    await signOut();
    router.push("/");
  }
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(7,11,20,0.85)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border)",
      padding: "0.85rem 2rem",
      display: "flex", alignItems: "center", justifyResponse: "center",
      justifyContent: "space-between",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
        <div style={{ width: 32, height: 32, borderRadius: "9px", background: "linear-gradient(135deg, #6C3AE8, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff", fontSize: "0.95rem" }}>K</div>
        <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>KStudy</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Home</Link>
        <Link href="/setup" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"} onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}>Setup Guide</Link>
        {userName && (
          <span style={{ fontSize: "0.83rem", color: "var(--text-muted)", borderLeft: "1px solid var(--border)", paddingLeft: "1rem" }}>
            👋 <strong style={{ color: "var(--text-primary)" }}>{userName}</strong>
          </span>
        )}
        <button
          onClick={handleSignOut}
          style={{ background: "none", border: "1px solid var(--border)", borderRadius: "0.6rem", padding: "0.4rem 0.85rem", color: "var(--text-muted)", fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.2s, color 0.2s" }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--violet-light)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >Sign Out</button>
      </div>
    </header>
  );
}

/* ─── Profile / Dashboard Page ───────────────────────────────── */
export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [txs, setTxs]                = useState<Transaction[]>([]);
  const [loadingTxs, setLoadingTxs]  = useState(true);

  // Fetch transaction history
  useEffect(() => {
    if (session?.user) {
      fetch("/api/transactions")
        .then((res) => res.json())
        .then((data) => {
          if (data.transactions) setTxs(data.transactions);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoadingTxs(false));
    }
  }, [session]);

  if (isPending) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-deep)", color: "var(--text-primary)" }}>
        <span style={{ width: 32, height: 32, border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "var(--violet-light)", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  const user = session?.user;
  // Get dynamic subscription info (from database addition fields mapped via better auth)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isSubscribed = (user as any)?.subscriptionActive;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const subPlan     = (user as any)?.subscriptionPlan ?? "free";

  return (
    <>
      <Topbar userName={user?.name} />
      <style>{`
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
        @keyframes spin { to { transform:rotate(360deg); } }
      `}</style>

      <main style={{ minHeight: "100vh", maxWidth: 1100, margin: "0 auto", padding: "100px 1.5rem 4rem" }}>
        
        {/* Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" style={{ top: "40%", right: "-10%" }} />

        {/* Dashboard Title */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div className="badge badge-violet" style={{ marginBottom: "0.75rem" }}>🎓 Student Dashboard</div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800 }}>
            Account <span className="gradient-text">Profile</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "0.25rem" }}>
            Manage your subscription, view transaction history, and configure your Telegram bot.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem", alignItems: "start" }}>
          
          {/* Left Column — Account Card & Subscription */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Profile Info */}
            <div className="glass" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {user?.image ? (
                  <img src={user.image} alt={user.name} style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid var(--violet)" }} />
                ) : (
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, var(--violet), var(--cyan))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "1.3rem", color: "#fff" }}>
                    {user?.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                )}
                <div>
                  <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--text-primary)" }}>{user?.name}</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", wordBreak: "break-all" }}>{user?.email}</p>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  <span>Status:</span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Verified Student</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.83rem", color: "var(--text-secondary)" }}>
                  <span>Joined KStudy:</span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Subscription Card */}
            <div className="glass" style={{ padding: "1.75rem", borderLeft: `3px solid ${isSubscribed ? "var(--violet-light)" : "var(--border)"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ fontWeight: 800, fontSize: "1.05rem" }}>Subscription</h3>
                <span className={`badge ${isSubscribed ? "badge-violet" : "badge-cyan"}`} style={{ padding: "0.2rem 0.6rem" }}>
                  {subPlan.toUpperCase()}
                </span>
              </div>

              {isSubscribed ? (
                <div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.8rem", fontWeight: 800 }}>₦2,000</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", paddingBottom: "0.25rem" }}>/month</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                    Your subscription is active and renews monthly. Enjoy unlimited access to Hermes AI on Telegram!
                  </p>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <Link href="/setup" className="btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.82rem", textDecoration: "none", flex: 1, justifyContent: "center" }}>
                      ⚙️ Setup Bot
                    </Link>
                    <button style={{ background: "none", border: "1px solid var(--border)", borderRadius: "9999px", padding: "0.55rem 1rem", fontSize: "0.82rem", color: "#f87171", cursor: "pointer", flex: 1 }} onClick={() => alert("To cancel your subscription, please message support at support@kstudy.app or contact us on @KStudySupport")}>
                      Cancel Plan
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "0.25rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-muted)" }}>₦0</span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", paddingBottom: "0.25rem" }}>/month</span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                    You are currently on the Free tier. Upgrade to Student Pro for unlimited messages, essay help, code debugging, and more!
                  </p>
                  <Link href="/#pricing" className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "0.6rem", fontSize: "0.85rem", textDecoration: "none" }}>
                    ⚡ Upgrade to Pro (₦2k/mo)
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Right Column — Bot config & Transactions */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Telegram Bot Details */}
            <div className="glass" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1.4rem" }}>🤖</span>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Your AI Bot Config</h3>
              </div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                Your KStudy agent runs inside your personal Telegram bot. Setup is fast using BotFather.
              </p>

              {isSubscribed ? (
                <div style={{ background: "rgba(108,58,232,0.06)", border: "1px solid rgba(108,58,232,0.2)", borderRadius: "1rem", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)" }}>Status</span>
                    <span className="badge badge-violet" style={{ fontSize: "0.75rem" }}>Connected</span>
                  </div>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                    Hermes AI is connected to your bot. If you need to reconfigure or connect a new token, follow our step-by-step setup guide.
                  </p>
                  <Link href="/setup" style={{ display: "inline-block", marginTop: "1rem", color: "var(--cyan)", fontSize: "0.82rem", textDecoration: "none", fontWeight: 600 }}>
                    Re-run Telegram Setup Guide →
                  </Link>
                </div>
              ) : (
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1.25rem", textAlign: "center" }}>
                  <span style={{ fontSize: "1.5rem" }}>🔒</span>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: 700, marginTop: "0.5rem", marginBottom: "0.25rem" }}>Telegram Bot Locked</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", lineHeight: 1.5, maxWidth: 300, margin: "0 auto" }}>
                    Subscribe to Student Pro to connect Hermes AI to your personal Telegram bot.
                  </p>
                </div>
              )}
            </div>

            {/* Transactions History */}
            <div className="glass" style={{ padding: "1.75rem", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1.4rem" }}>💳</span>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Billing & Transactions</h3>
              </div>

              {loadingTxs ? (
                <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                  <span style={{ width: 24, height: 24, border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "var(--violet-light)", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                </div>
              ) : txs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2.5rem 1rem", border: "1px dashed var(--border)", borderRadius: "1rem" }}>
                  <span style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>📂</span>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--text-secondary)", marginTop: "0.5rem" }}>No Transactions Yet</h4>
                  <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                    When you subscribe, your Paystack bills will show up here.
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 460 }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--border)", textAlign: "left" }}>
                        <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>DATE</th>
                        <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>PLAN</th>
                        <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>REFERENCE</th>
                        <th style={{ padding: "0.75rem 0.5rem", fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>AMOUNT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {txs.map((tx) => (
                        <tr key={tx._id} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", fontSize: "0.83rem" }}>
                          <td style={{ padding: "0.85rem 0.5rem", color: "var(--text-secondary)" }}>
                            {new Date(tx.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </td>
                          <td style={{ padding: "0.85rem 0.5rem" }}>
                            <span className="badge badge-violet" style={{ fontSize: "0.7rem", padding: "0.15rem 0.45rem" }}>{tx.plan}</span>
                          </td>
                          <td style={{ padding: "0.85rem 0.5rem", fontFamily: "var(--font-geist-mono), monospace", color: "var(--text-muted)" }}>
                            {tx.reference.substring(0, 12)}...
                          </td>
                          <td style={{ padding: "0.85rem 0.5rem", textAlign: "right", fontWeight: 700, color: "var(--text-primary)" }}>
                            ₦{tx.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>
    </>
  );
}
