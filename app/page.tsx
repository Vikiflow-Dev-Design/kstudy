"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── Nav ─────────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "10px",
          background: "linear-gradient(135deg, #6C3AE8 0%, #00D4FF 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem", fontWeight: 700, color: "#fff",
        }}>K</div>
        <span style={{ fontWeight: 700, fontSize: "1.15rem", color: "var(--text-primary)" }}>KStudy</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <a href="#how-it-works" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>How It Works</a>
        <a href="#pricing" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>Pricing</a>
        <Link href="/sign-in" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>Sign In</Link>
        <Link href="/sign-up" className="btn-primary" style={{ padding: "0.5rem 1.1rem", fontSize: "0.83rem" }}>Get Started</Link>
      </div>
    </nav>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
function Hero({ onPay }: { onPay: () => void }) {
  return (
    <section style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", paddingTop: "80px",
    }}>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="dot-grid" style={{ opacity: 0.4 }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto", textAlign: "center", padding: "2rem 1.5rem" }}>
        <div className="badge badge-cyan fade-up fade-up-d1" style={{ marginBottom: "1.5rem", display: "inline-flex", gap: "0.4rem", alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D4FF", display: "inline-block" }} />
          Powered by Hermes AI • On Telegram
        </div>

        <h1 className="fade-up fade-up-d2" style={{ fontSize: "clamp(2.2rem, 6vw, 4.2rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem" }}>
          Your AI Study Agent,<br />
          <span className="gradient-text">Right in Telegram</span>
        </h1>

        <p className="fade-up fade-up-d3" style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 2.5rem" }}>
          KStudy connects a powerful self-hosted Hermes AI agent to your Telegram. Subscribe for <strong style={{ color: "var(--text-primary)" }}>₦2,000/month</strong> and get instant access — assignments, research, writing, scheduling, all from your phone.
        </p>

        <div className="fade-up fade-up-d4" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onPay} className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2.2rem" }}>
            Subscribe Now — ₦2,000/mo →
          </button>
          <a href="#how-it-works" className="btn-outline" style={{ fontSize: "1rem", padding: "0.9rem 2.2rem" }}>
            See How It Works
          </a>
        </div>

        {/* Telegram preview mockup */}
        <div className="glass glow-violet fade-up fade-up-d5" style={{ marginTop: "4rem", overflow: "hidden", maxWidth: 500, margin: "4rem auto 0", borderRadius: "1.5rem" }}>
          <div style={{ background: "#0d1425", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem", borderBottom: "1px solid var(--border)" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #6C3AE8, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>🤖</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>KStudy Agent</div>
              <div style={{ fontSize: "0.72rem", color: "#22c55e", display: "flex", alignItems: "center", gap: "0.3rem" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />online
              </div>
            </div>
          </div>
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem", background: "rgba(7,11,20,0.5)" }}>
            <div className="chat-bubble-ai" style={{ fontSize: "0.85rem" }}>
              👋 Welcome to <strong>KStudy</strong>! I'm your personal AI study agent. How can I help you today?
            </div>
            <div className="chat-bubble-user" style={{ fontSize: "0.85rem" }}>
              Can you help me summarize this research paper?
            </div>
            <div className="chat-bubble-ai" style={{ fontSize: "0.85rem" }}>
              Of course! Send me the paper (PDF or link) and I'll give you a structured summary with key findings 📄✨
            </div>
          </div>
          <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--border)", background: "rgba(13,20,37,0.8)", display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)", borderRadius: "9999px", padding: "0.5rem 1rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Message KStudy Agent...
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--violet)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ──────────────────────────────────────────── */
const STEPS = [
  { num: "01", icon: "💳", title: "Subscribe — ₦2,000", desc: "Click Subscribe below, enter your email, and pay securely via Paystack. Takes 30 seconds." },
  { num: "02", icon: "📧", title: "Get Your Access Code", desc: "Instantly receive your unique KStudy access code via email after payment." },
  { num: "03", icon: "✈️", title: "Open Telegram", desc: "Search for @KStudyAgent on Telegram or click the link we send you to open the bot directly." },
  { num: "04", icon: "🔑", title: "Connect & Activate", desc: "Send your access code to the bot. It verifies your subscription and activates your Hermes AI agent." },
  { num: "05", icon: "🚀", title: "Start Studying Smarter", desc: "Your AI agent is live! Ask it anything — assignments, essays, research, coding, scheduling — 24/7." },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <div className="badge badge-violet" style={{ marginBottom: "1rem" }}>⚡ Simple Setup</div>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "1rem" }}>
          Up & Running in <span className="gradient-text">5 Minutes</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 460, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>
          No technical setup needed. Just pay, connect on Telegram, and chat.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "relative" }}>
        <div style={{ position: "absolute", left: "2.5rem", top: "3rem", bottom: "3rem", width: "2px", background: "linear-gradient(to bottom, var(--violet), var(--cyan), var(--pink))", opacity: 0.4 }} />
        {STEPS.map((s) => (
          <div key={s.num} className="glass" style={{ padding: "1.5rem 1.5rem 1.5rem 1.75rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}>
            <div style={{ minWidth: 52, height: 52, borderRadius: "14px", background: "linear-gradient(135deg, rgba(108,58,232,0.3), rgba(0,212,255,0.2))", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", position: "relative", zIndex: 1 }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--violet-light)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.2rem" }}>STEP {s.num}</div>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.4rem" }}>{s.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
        <Link href="/setup" style={{ color: "var(--cyan)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
          View full setup guide after subscribing →
        </Link>
      </div>
    </section>
  );
}

/* ─── Paystack Payment Modal ────────────────────────────────── */
function PaymentModal({ onClose }: { onClose: () => void }) {
  const [step, setStep]       = useState<"email" | "success">("email");
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  // ₦2,000 in kobo
  const AMOUNT_KOBO  = 200000;
  const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";

  function openPaystack() {
    if (!email) { setError("Please enter your email address."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email."); return; }
    setError("");
    setLoading(true);

    const launch = () => {
      // @ts-expect-error — PaystackPop injected by Paystack inline script
      const handler = window.PaystackPop.setup({
        key:      PAYSTACK_KEY,
        email,
        amount:   AMOUNT_KOBO,
        currency: "NGN",
        ref:      `kstudy_${Date.now()}`,
        metadata: {
          custom_fields: [
            { display_name: "Plan", variable_name: "plan", value: "student" },
          ],
        },
        onClose() { setLoading(false); },
        callback(_res: { reference: string }) {
          setLoading(false);
          setStep("success");
        },
      });
      handler.openIframe();
    };

    if (document.getElementById("paystack-inline-js")) {
      launch();
    } else {
      const s   = document.createElement("script");
      s.id      = "paystack-inline-js";
      s.src     = "https://js.paystack.co/v1/inline.js";
      s.onload  = launch;
      s.onerror = () => { setLoading(false); setError("Failed to load Paystack. Check your connection."); };
      document.body.appendChild(s);
    }
  }

  const inp: React.CSSProperties = {
    width: "100%", padding: "0.75rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(108,58,232,0.25)",
    borderRadius: "0.75rem", color: "var(--text-primary)",
    fontSize: "0.9rem", outline: "none", fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(7,11,20,0.88)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      onClick={onClose}
    >
      <div className="glass glow-violet" style={{ width: "100%", maxWidth: 420, padding: "2rem", position: "relative" }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "1.4rem", lineHeight: 1 }}>×</button>

        {step === "email" ? (
          <>
            <div style={{ marginBottom: "1.75rem" }}>
              <div className="badge badge-violet" style={{ marginBottom: "0.75rem" }}>🔒 Secure Checkout via Paystack</div>
              <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.3rem" }}>KStudy Student Plan</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>₦2,000 / month • Cancel anytime</p>
            </div>

            <div style={{ background: "rgba(108,58,232,0.08)", border: "1px solid rgba(108,58,232,0.2)", borderRadius: "0.9rem", padding: "1rem", marginBottom: "1.5rem" }}>
              {["Unlimited AI messages on Telegram", "Assignments, essays & research", "Powered by Hermes AI • Available 24/7"].map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.83rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>✓</span>{f}
                </div>
              ))}
            </div>

            {error && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.35)", borderRadius: "0.75rem", padding: "0.6rem 1rem", fontSize: "0.82rem", color: "#f87171", marginBottom: "1rem" }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "0.4rem", letterSpacing: "0.05em" }}>YOUR EMAIL ADDRESS</label>
              <input
                id="paystack-email"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && openPaystack()}
                style={inp}
                onFocus={(e) => { e.target.style.borderColor = "var(--violet-light)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,58,232,0.15)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "rgba(108,58,232,0.25)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            <button
              id="paystack-pay-btn"
              onClick={openPaystack}
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "0.9rem", fontSize: "0.95rem", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} />
                  Opening Paystack...
                </span>
              ) : "🔒 Pay ₦2,000 with Paystack →"}
            </button>
            <p style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
              🔒 Secured by Paystack • Cancel anytime
            </p>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>Payment Successful!</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "2rem" }}>
              Your access code has been sent to{" "}
              <strong style={{ color: "var(--text-primary)" }}>{email}</strong>.<br />
              Follow the setup guide to connect your Telegram agent.
            </p>
            <Link href="/setup" className="btn-primary" style={{ justifyContent: "center", display: "inline-flex", padding: "0.9rem 2rem", textDecoration: "none" }}>
              View Setup Guide →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Pricing Section ───────────────────────────────────────── */
function Pricing({ onPay }: { onPay: () => void }) {
  return (
    <section id="pricing" className="section" style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
      <div style={{ marginBottom: "3rem" }}>
        <div className="badge badge-gold" style={{ marginBottom: "1rem" }}>💰 One Simple Plan</div>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, marginBottom: "1rem" }}>
          Just <span className="gradient-text">₦2,000 a Month</span>
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 420, margin: "0 auto", fontSize: "1rem", lineHeight: 1.7 }}>
          Full, unlimited access to your personal AI study agent on Telegram. No tiers, no tricks.
        </p>
      </div>

      <div className="pricing-card featured" style={{ maxWidth: 480, margin: "0 auto", padding: "2.5rem" }}>
        <div className="badge badge-violet" style={{ marginBottom: "1.25rem" }}>✦ Student Plan</div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "0.35rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "5rem", fontWeight: 900, lineHeight: 1, background: "linear-gradient(135deg, var(--violet-light), var(--cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>₦2k</span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", paddingBottom: "1rem" }}>/month</span>
        </div>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Everything you need, for less than a coffee ☕
        </p>

        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "2rem", textAlign: "left" }}>
          {[
            "Unlimited AI messages on Telegram",
            "Assignments, essays & coding help",
            "Web search & research summaries",
            "Document & note generation",
            "Study planner & reminders",
            "24/7 availability",
            "Multi-language support",
            "Powered by Hermes AI (self-hosted)",
          ].map((f) => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              <span style={{ color: "#22c55e", fontWeight: 700, fontSize: "1rem" }}>✓</span>{f}
            </li>
          ))}
        </ul>

        <button onClick={onPay} className="btn-primary" style={{ width: "100%", justifyContent: "center", padding: "1rem", fontSize: "1rem" }}>
          🚀 Subscribe for ₦2,000/month
        </button>
        <p style={{ marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
          Secure payment via Paystack • Cancel anytime
        </p>
      </div>
    </section>
  );
}

/* ─── FAQ ──────────────────────────────────────────────────── */
const FAQS = [
  { q: "Do I need to install anything?", a: "No! KStudy runs entirely through Telegram. Just subscribe, follow the setup guide, and start chatting with your AI agent." },
  { q: "What is Hermes AI?", a: "Hermes is a powerful, self-hosted AI language model. We run it on our own servers so your conversations stay private and fast." },
  { q: "Can I cancel anytime?", a: "Absolutely. Cancel with one click from your account dashboard. You'll keep access until the end of your billing period." },
  { q: "Is my data private?", a: "Yes. Your conversations are processed on our private Hermes server and are never shared or sold to third parties." },
  { q: "What payment methods are supported?", a: "We use Paystack, which supports debit cards, credit cards, bank transfers, and USSD for Nigerian users." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section" style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800 }}>
          Got Questions? <span className="gradient-text">We've Got Answers.</span>
        </h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {FAQS.map((f, i) => (
          <div key={i} className="glass" style={{ overflow: "hidden" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "1.1rem 1.25rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", color: "var(--text-primary)", fontFamily: "inherit", fontWeight: 600, fontSize: "0.93rem" }}
            >
              {f.q}
              <span style={{ color: "var(--violet-light)", fontSize: "1.2rem", transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)", display: "inline-block", minWidth: 20 }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: "0 1.25rem 1.1rem", color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.7, borderTop: "1px solid var(--border)" }}>
                <br />{f.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA Bottom ────────────────────────────────────────────── */
function CTABottom({ onPay }: { onPay: () => void }) {
  return (
    <section className="section" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
      <div className="glass glow-violet" style={{ padding: "3.5rem 2rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(108,58,232,0.1), rgba(0,212,255,0.06))", borderRadius: "inherit" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>✈️</div>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, marginBottom: "0.75rem" }}>
            Start on Telegram in <span className="gradient-text">5 minutes</span>
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", maxWidth: 420, margin: "0 auto 2rem" }}>
            Subscribe and your AI study agent will be waiting in your Telegram inbox.
          </p>
          <button onClick={onPay} className="btn-primary" style={{ fontSize: "1rem", padding: "0.9rem 2.5rem" }}>
            🚀 Subscribe — ₦2,000/mo
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ width: 28, height: 28, borderRadius: "8px", background: "linear-gradient(135deg, #6C3AE8, #00D4FF)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", color: "#fff" }}>K</div>
        <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>KStudy</span>
        <span style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginLeft: "0.75rem" }}>© 2026 KStudy. All rights reserved.</span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {["Privacy", "Terms", "Contact"].map((l) => (
          <a key={l} href="#" style={{ color: "var(--text-muted)", fontSize: "0.78rem", textDecoration: "none" }}>{l}</a>
        ))}
      </div>
    </footer>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  return (
    <>
      {showModal && <PaymentModal onClose={() => setShowModal(false)} />}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <Navbar />
      <main>
        <Hero onPay={openModal} />
        <HowItWorks />
        <Pricing onPay={openModal} />
        <FAQ />
        <CTABottom onPay={openModal} />
      </main>
      <Footer />
    </>
  );
}
