"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

/* ── Google icon SVG ──────────────────────────── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" fill="none">
      <path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.8 20-21 0-1.4-.2-2.7-.5-4z" fill="#FFC107"/>
      <path d="M6.3 14.7l7 5.1C15.2 15.5 19.2 12 24 12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 16.3 3 9.6 7.9 6.3 14.7z" fill="#FF3D00"/>
      <path d="M24 45c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 35.9 27 37 24 37c-6 0-10.6-3.9-11.8-9.5l-7 5.4C8.5 40.1 15.7 45 24 45z" fill="#4CAF50"/>
      <path d="M44.5 20H24v8.5h11.8c-1.1 3-3.3 5.4-6.1 7l6.6 5.6C40.7 37.4 44.5 31.3 44.5 24c0-1.4-.2-2.7-.5-4z" fill="#1976D2"/>
    </svg>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.72rem 1rem",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(108,58,232,0.25)",
  borderRadius: "0.75rem",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

export default function SignUpPage() {
  const router = useRouter();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState<"google" | "email" | null>(null);

  /* ── Google sign-up ─────────────────────────── */
  async function handleGoogle() {
    setLoading("google");
    setError("");
    await signIn.social({
      provider:    "google",
      callbackURL: "/setup",
    });
    setLoading(null);
  }

  /* ── Email sign-up ──────────────────────────── */
  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading("email");
    setError("");
    try {
      const result = await signUp.email({ name, email, password, callbackURL: "/setup" });
      if (result?.error) {
        setError(result.error.message ?? "Sign-up failed. Please try again.");
      } else {
        router.push("/setup");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <div
      className="glass glow-violet"
      style={{ width: "100%", maxWidth: 460, padding: "2.5rem 2rem", position: "relative", zIndex: 10 }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", marginBottom: "2rem" }}>
        <div style={{
          width: 34, height: 34, borderRadius: "10px",
          background: "linear-gradient(135deg, #6C3AE8, #00D4FF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, color: "#fff", fontSize: "1rem",
        }}>K</div>
        <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)" }}>KStudy</span>
      </Link>

      <h1 style={{ fontSize: "1.6rem", fontWeight: 800, marginBottom: "0.35rem" }}>Create your account</h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.75rem" }}>
        Get your personal AI study agent on Telegram for <strong style={{ color: "var(--text-primary)" }}>$2/month</strong>.
      </p>

      {/* Google button */}
      <button
        id="google-signup-btn"
        onClick={handleGoogle}
        disabled={!!loading}
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.65rem",
          padding: "0.78rem",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "0.75rem",
          color: "var(--text-primary)",
          fontFamily: "inherit", fontWeight: 600, fontSize: "0.9rem",
          cursor: "pointer",
          transition: "background 0.2s, border-color 0.2s",
          marginBottom: "1.5rem",
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)"; } }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
      >
        {loading === "google" ? (
          <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} />
        ) : <GoogleIcon />}
        Sign up with Google
      </button>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 }}>or sign up with email</span>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      {/* Email form */}
      <form onSubmit={handleEmail} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.75rem", padding: "0.65rem 1rem", fontSize: "0.83rem", color: "#f87171" }}>
            ⚠️ {error}
          </div>
        )}

        <div>
          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "0.35rem", letterSpacing: "0.05em" }}>FULL NAME</label>
          <input
            id="name-input"
            type="text" required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
            onFocus={(e)  => { e.target.style.borderColor = "var(--violet-light)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,58,232,0.15)"; }}
            onBlur={(e)   => { e.target.style.borderColor = "rgba(108,58,232,0.25)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <div>
          <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "0.35rem", letterSpacing: "0.05em" }}>EMAIL</label>
          <input
            id="signup-email-input"
            type="email" required
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            onFocus={(e)  => { e.target.style.borderColor = "var(--violet-light)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,58,232,0.15)"; }}
            onBlur={(e)   => { e.target.style.borderColor = "rgba(108,58,232,0.25)"; e.target.style.boxShadow = "none"; }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "0.35rem", letterSpacing: "0.05em" }}>PASSWORD</label>
            <input
              id="signup-password-input"
              type="password" required
              placeholder="Min 8 chars"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e)  => { e.target.style.borderColor = "var(--violet-light)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,58,232,0.15)"; }}
              onBlur={(e)   => { e.target.style.borderColor = "rgba(108,58,232,0.25)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <label style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600, display: "block", marginBottom: "0.35rem", letterSpacing: "0.05em" }}>CONFIRM</label>
            <input
              id="confirm-password-input"
              type="password" required
              placeholder="Repeat"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={{
                ...inputStyle,
                borderColor: confirm && confirm !== password ? "rgba(239,68,68,0.5)" : "rgba(108,58,232,0.25)",
              }}
              onFocus={(e)  => { e.target.style.borderColor = "var(--violet-light)"; e.target.style.boxShadow = "0 0 0 3px rgba(108,58,232,0.15)"; }}
              onBlur={(e)   => { e.target.style.borderColor = confirm !== password ? "rgba(239,68,68,0.5)" : "rgba(108,58,232,0.25)"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Password strength */}
        {password.length > 0 && (
          <div style={{ display: "flex", gap: "4px", marginTop: "-0.25rem" }}>
            {[...Array(4)].map((_, i) => {
              const strength = password.length >= 12 ? 4 : password.length >= 10 ? 3 : password.length >= 8 ? 2 : 1;
              const colors   = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
              return <div key={i} style={{ flex: 1, height: 3, borderRadius: 9999, background: i < strength ? colors[strength - 1] : "var(--border)", transition: "background 0.3s" }} />;
            })}
          </div>
        )}

        <button
          id="email-signup-btn"
          type="submit"
          className="btn-primary"
          disabled={!!loading}
          style={{ justifyContent: "center", padding: "0.85rem", fontSize: "0.93rem", marginTop: "0.25rem", opacity: loading ? 0.7 : 1 }}
        >
          {loading === "email" ? (
            <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.6s linear infinite" }} />
              Creating account...
            </span>
          ) : "Create Account →"}
        </button>

        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
          By signing up, you agree to our{" "}
          <a href="#" style={{ color: "var(--violet-light)", textDecoration: "none" }}>Terms of Service</a>
          {" "}and{" "}
          <a href="#" style={{ color: "var(--violet-light)", textDecoration: "none" }}>Privacy Policy</a>.
        </p>
      </form>

      {/* Sign in link */}
      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.83rem", color: "var(--text-muted)" }}>
        Already have an account?{" "}
        <Link href="/sign-in" style={{ color: "var(--violet-light)", fontWeight: 600, textDecoration: "none" }}>
          Sign in
        </Link>
      </p>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
