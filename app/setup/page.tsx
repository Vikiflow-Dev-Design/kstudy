"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

/* ─── Types ──────────────────────────────────────────────── */
type Step = {
  id:    number;
  icon:  string;
  title: string;
  desc:  string;
  content: React.ReactNode;
};

/* ─── Topbar ─────────────────────────────────────────────── */
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
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
        <div style={{
          width: 32, height: 32, borderRadius: "9px",
          background: "linear-gradient(135deg, #6C3AE8, #00D4FF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, color: "#fff", fontSize: "0.95rem",
        }}>K</div>
        <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>KStudy</span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {userName && (
          <span style={{ fontSize: "0.83rem", color: "var(--text-secondary)" }}>
            👋 Hi, <strong style={{ color: "var(--text-primary)" }}>{userName.split(" ")[0]}</strong>
          </span>
        )}
        <button
          onClick={handleSignOut}
          style={{
            background: "none", border: "1px solid var(--border)", borderRadius: "0.6rem",
            padding: "0.4rem 0.85rem", color: "var(--text-muted)",
            fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--violet-light)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

/* ─── Code block helper ──────────────────────────────────── */
function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div style={{
      background: "rgba(0,0,0,0.4)", border: "1px solid var(--border)",
      borderRadius: "0.75rem", padding: "0.75rem 1rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      gap: "1rem", marginTop: "0.75rem",
    }}>
      <code style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "0.88rem", color: "var(--cyan)", wordBreak: "break-all" }}>
        {children}
      </code>
      <button
        onClick={copy}
        style={{
          background: copied ? "rgba(34,197,94,0.15)" : "rgba(108,58,232,0.15)",
          border: `1px solid ${copied ? "rgba(34,197,94,0.4)" : "rgba(108,58,232,0.4)"}`,
          borderRadius: "0.5rem", padding: "0.3rem 0.65rem",
          color: copied ? "#22c55e" : "var(--violet-light)",
          fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
          fontFamily: "inherit", transition: "all 0.2s", whiteSpace: "nowrap",
        }}
      >{copied ? "✓ Copied" : "Copy"}</button>
    </div>
  );
}

/* ─── Telegram link helper ───────────────────────────────── */
function TelegramButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        padding: "0.7rem 1.4rem", marginTop: "0.75rem",
        background: "linear-gradient(135deg, #229ED9, #1a8fc7)",
        color: "#fff", borderRadius: "9999px",
        fontWeight: 600, fontSize: "0.9rem", textDecoration: "none",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(34,158,217,0.4)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.02 9.523c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.393c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.27 14.46l-2.967-.924c-.645-.204-.658-.645.136-.953l11.59-4.47c.537-.194 1.006.131.833.134z"/>
      </svg>
      {label}
    </a>
  );
}

/* ─── Step content ───────────────────────────────────────── */
function AccessCodeDisplay({ email }: { email?: string }) {
  // In production this would be fetched from the user's subscription record
  const code = "KSTUDY-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  return (
    <div>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.5rem" }}>
        Your unique access code was sent to <strong style={{ color: "var(--text-primary)" }}>{email ?? "your email"}</strong>. You can also copy it here:
      </p>
      <CodeBlock>{code}</CodeBlock>
      <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
        ⚠️ Keep this code private — it activates your personal AI agent.
      </p>
    </div>
  );
}

/* ─── Steps definition ───────────────────────────────────── */
function buildSteps(email?: string): Step[] {
  return [
    {
      id: 1,
      icon: "🎉",
      title: "Payment Confirmed",
      desc: "Your subscription is active",
      content: (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: "0.85rem", color: "#22c55e", fontWeight: 600 }}>Subscription Active — Student Plan</span>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
            Welcome to KStudy! Your $2/month subscription gives you <strong style={{ color: "var(--text-primary)" }}>unlimited</strong> access to your personal Hermes AI agent on Telegram. Let's get you set up — it only takes a few minutes.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[
              { icon: "✅", label: "Unlimited AI messages" },
              { icon: "✅", label: "Powered by Hermes AI" },
              { icon: "✅", label: "Private & secure" },
              { icon: "✅", label: "24/7 availability" },
            ].map((i) => (
              <div key={i.label} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                <span>{i.icon}</span>{i.label}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 2,
      icon: "🔑",
      title: "Your Access Code",
      desc: "Copy your unique activation code",
      content: <AccessCodeDisplay email={email} />,
    },
    {
      id: 3,
      icon: "✈️",
      title: "Open Telegram",
      desc: "Find the KStudy bot",
      content: (
        <div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Open Telegram on your phone or desktop. You have two options to find the bot:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div className="glass" style={{ padding: "1rem 1.25rem" }}>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.3rem" }}>Option A — Direct link</div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.6, marginBottom: "0.25rem" }}>
                Click the button below to open the bot directly in Telegram:
              </p>
              <TelegramButton label="Open @KStudyAgent on Telegram" href="https://t.me/KStudyAgent" />
            </div>
            <div className="glass" style={{ padding: "1rem 1.25rem" }}>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.3rem" }}>Option B — Search</div>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.83rem", lineHeight: 1.6 }}>
                Open Telegram → tap the search icon → type:
              </p>
              <CodeBlock>@KStudyAgent</CodeBlock>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      icon: "💬",
      title: "Start the Bot",
      desc: "Send /start to wake up your agent",
      content: (
        <div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Once you've opened the bot, tap the <strong style={{ color: "var(--text-primary)" }}>START</strong> button or type the command below to begin:
          </p>
          <CodeBlock>/start</CodeBlock>
          <div style={{ marginTop: "1rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Bot response preview:</div>
            <div className="chat-bubble-ai" style={{ fontSize: "0.85rem", maxWidth: "100%" }}>
              👋 <strong>Welcome to KStudy!</strong> I'm your personal AI study agent, powered by Hermes AI.<br /><br />
              To activate your subscription, please send me your access code using:<br />
              <code style={{ fontFamily: "monospace", color: "var(--cyan)" }}>/activate YOUR_CODE</code>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      icon: "🔐",
      title: "Activate Your Agent",
      desc: "Send your access code to the bot",
      content: (
        <div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Send this command to the bot, replacing <code style={{ color: "var(--cyan)", fontFamily: "monospace" }}>YOUR_CODE</code> with the code from Step 2:
          </p>
          <CodeBlock>/activate YOUR_CODE</CodeBlock>
          <div style={{ marginTop: "1rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", borderRadius: "1rem", padding: "1rem 1.25rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>Activation success response:</div>
            <div className="chat-bubble-ai" style={{ fontSize: "0.85rem", maxWidth: "100%" }}>
              ✅ <strong>Activated!</strong> Your KStudy agent is now live.<br /><br />
              Your Hermes AI agent is ready. Just send me any message to get started — assignment help, research, essays, code, or anything else. I'm here 24/7! 🚀
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      icon: "🚀",
      title: "You're All Set!",
      desc: "Start studying smarter",
      content: (
        <div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem" }}>
            Your AI study agent is connected and ready. Here are some things you can ask it right away:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { cmd: "Summarize this research paper for me [paste text]", icon: "📄" },
              { cmd: "Help me write an introduction for my essay on [topic]", icon: "✍️" },
              { cmd: "Explain [concept] in simple terms", icon: "💡" },
              { cmd: "Create a 7-day study plan for my [exam] exam", icon: "📅" },
              { cmd: "Debug this code: [paste code]", icon: "🐛" },
              { cmd: "Translate this paragraph to French: [text]", icon: "🌐" },
            ].map((c) => (
              <div key={c.cmd} style={{
                display: "flex", alignItems: "flex-start", gap: "0.75rem",
                background: "rgba(108,58,232,0.08)", border: "1px solid rgba(108,58,232,0.2)",
                borderRadius: "0.75rem", padding: "0.65rem 0.9rem",
              }}>
                <span style={{ fontSize: "1.1rem" }}>{c.icon}</span>
                <span style={{ fontSize: "0.83rem", color: "var(--text-secondary)", lineHeight: 1.5, fontFamily: "var(--font-geist-mono), monospace" }}>
                  "{c.cmd}"
                </span>
              </div>
            ))}
          </div>
          <TelegramButton label="Open My KStudy Agent" href="https://t.me/KStudyAgent" />
        </div>
      ),
    },
  ];
}

/* ─── Page ─────────────────────────────────────────────── */
export default function SetupPage() {
  const { data: session } = useSession();
  const [activeStep, setActiveStep] = useState(1);

  const steps = buildSteps(session?.user?.email);
  const currentStep = steps.find((s) => s.id === activeStep)!;
  const progress = ((activeStep - 1) / (steps.length - 1)) * 100;

  return (
    <>
      <Topbar userName={session?.user?.name} />
      <style>{`@keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.4); } }`}</style>

      <main style={{ paddingTop: "80px", minHeight: "100vh", maxWidth: 860, margin: "0 auto", padding: "100px 1.5rem 4rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="badge badge-cyan" style={{ marginBottom: "0.75rem" }}>⚡ Setup Guide</div>
          <h1 style={{ fontSize: "clamp(1.7rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.6rem" }}>
            Connect Your <span className="gradient-text">AI Agent on Telegram</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Follow these steps to activate your personal Hermes AI study agent.
          </p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em" }}>
              STEP {activeStep} OF {steps.length}
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--violet-light)", fontWeight: 600 }}>
              {Math.round(progress)}% complete
            </span>
          </div>
          <div style={{ width: "100%", height: 6, background: "rgba(108,58,232,0.15)", borderRadius: 9999, overflow: "hidden" }}>
            <div style={{
              width: `${progress}%`, height: "100%", borderRadius: 9999,
              background: "linear-gradient(90deg, var(--violet) 0%, var(--cyan) 100%)",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "1.5rem", alignItems: "start" }}>
          {/* Step navigation sidebar */}
          <div className="glass" style={{ padding: "1rem", borderRadius: "1.25rem" }}>
            {steps.map((s) => {
              const done    = s.id < activeStep;
              const current = s.id === activeStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  style={{
                    width: "100%", textAlign: "left", background: "none", border: "none",
                    borderRadius: "0.75rem", padding: "0.7rem 0.85rem",
                    cursor: "pointer", fontFamily: "inherit",
                    display: "flex", alignItems: "center", gap: "0.65rem",
                    marginBottom: "0.25rem",
                    background: current ? "rgba(108,58,232,0.18)" : done ? "rgba(34,197,94,0.06)" : "transparent",
                    borderLeft: current ? "2px solid var(--violet-light)" : done ? "2px solid rgba(34,197,94,0.5)" : "2px solid transparent",
                    transition: "background 0.2s",
                  } as React.CSSProperties}
                >
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: done ? "0.8rem" : "0.75rem",
                    fontWeight: 700,
                    background: done ? "rgba(34,197,94,0.2)" : current ? "rgba(108,58,232,0.3)" : "rgba(255,255,255,0.06)",
                    color: done ? "#22c55e" : current ? "var(--violet-light)" : "var(--text-muted)",
                    border: `1px solid ${done ? "rgba(34,197,94,0.4)" : current ? "rgba(108,58,232,0.5)" : "var(--border)"}`,
                  }}>
                    {done ? "✓" : s.id}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: current ? "var(--text-primary)" : done ? "var(--text-secondary)" : "var(--text-muted)", lineHeight: 1.2 }}>
                      {s.title}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", lineHeight: 1.2, marginTop: "0.1rem" }}>
                      {s.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main content area */}
          <div className="glass" style={{ padding: "2rem", minHeight: 380, display: "flex", flexDirection: "column" }}>
            {/* Step header */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border)" }}>
              <div style={{
                width: 52, height: 52, borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(108,58,232,0.3), rgba(0,212,255,0.2))",
                border: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.6rem",
              }}>{currentStep.icon}</div>
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--violet-light)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: "0.15rem" }}>
                  STEP {currentStep.id} OF {steps.length}
                </div>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 800 }}>{currentStep.title}</h2>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>{currentStep.desc}</p>
              </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              {currentStep.content}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }}>
              <button
                onClick={() => setActiveStep((p) => Math.max(1, p - 1))}
                disabled={activeStep === 1}
                style={{
                  background: "none", border: "1px solid var(--border)", borderRadius: "9999px",
                  padding: "0.6rem 1.25rem", color: "var(--text-secondary)",
                  fontSize: "0.875rem", fontWeight: 600, cursor: activeStep === 1 ? "not-allowed" : "pointer",
                  fontFamily: "inherit", opacity: activeStep === 1 ? 0.4 : 1, transition: "all 0.2s",
                }}
              >
                ← Back
              </button>

              {activeStep < steps.length ? (
                <button
                  onClick={() => setActiveStep((p) => Math.min(steps.length, p + 1))}
                  className="btn-primary"
                  style={{ padding: "0.6rem 1.6rem", fontSize: "0.9rem" }}
                >
                  Next Step →
                </button>
              ) : (
                <a href="https://t.me/KStudyAgent" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.6rem 1.6rem", fontSize: "0.9rem", textDecoration: "none" }}>
                  🚀 Open Telegram
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Help note */}
        <div className="glass" style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "1.3rem" }}>💬</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.15rem" }}>Need help?</div>
            <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
              Having trouble connecting? Email us at{" "}
              <a href="mailto:support@kstudy.app" style={{ color: "var(--violet-light)", textDecoration: "none" }}>support@kstudy.app</a>
              {" "}or{" "}
              <a href="https://t.me/KStudySupport" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan)", textDecoration: "none" }}>message us on Telegram</a>.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
