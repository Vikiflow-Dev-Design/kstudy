import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KStudy — Sign In",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="dot-grid" style={{ opacity: 0.3 }} />
      {children}
    </div>
  );
}
