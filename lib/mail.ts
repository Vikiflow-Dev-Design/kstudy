import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM ?? '"KStudy" <info@celfedu.com>';

export async function sendAccessCodeEmail(toEmail: string, accessCode: string, userName?: string) {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[Mail] SMTP environment variables are missing. Cannot send email.");
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // True for port 465, false for 587 or 25
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const name = userName ? userName.split(" ")[0] : "Student";

  const mailOptions = {
    from: SMTP_FROM,
    to: toEmail,
    subject: "🗝️ Your KStudy Access Code & Setup Instructions",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 2rem; background: #070b14; color: #f3f4f6; border-radius: 16px; border: 1px solid rgba(108, 58, 232, 0.15);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <div style="display: inline-block; width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #6C3AE8, #00D4FF); line-height: 48px; font-weight: 800; color: #fff; font-size: 1.5rem;">K</div>
          <h2 style="font-size: 1.8rem; font-weight: 800; margin-top: 1rem; color: #ffffff;">KStudy Confirmations</h2>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.6; color: #d1d5db;">Hello ${name},</p>
        <p style="font-size: 1.05rem; line-height: 1.6; color: #d1d5db;">Thank you for subscribing to the <strong>KStudy Student Pro Plan</strong>! Your payment has been confirmed successfully.</p>

        <div style="background: rgba(108, 58, 232, 0.08); border: 1px solid rgba(108, 58, 232, 0.25); border-radius: 12px; padding: 1.5rem; text-align: center; margin: 2rem 0;">
          <span style="font-size: 0.85rem; color: #9ca3af; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">Your KStudy Access Code</span>
          <code style="font-family: monospace; font-size: 1.8rem; color: #00D4FF; font-weight: 800; letter-spacing: 0.1em;">${accessCode}</code>
          <p style="font-size: 0.8rem; color: #9ca3af; margin-top: 0.5rem; margin-bottom: 0;">⚠️ Please keep this code private. Do not share it with anyone.</p>
        </div>

        <h3 style="font-size: 1.2rem; font-weight: 700; color: #ffffff; margin-top: 2rem; margin-bottom: 0.75rem;">🚀 How to setup your Telegram Bot</h3>
        <ol style="padding-left: 1.25rem; font-size: 0.95rem; line-height: 1.7; color: #d1d5db;">
          <li style="margin-bottom: 0.5rem;">Go to the <a href="https://t.me/BotFather" style="color: #6C3AE8; font-weight: 600; text-decoration: none;">@BotFather</a> on Telegram.</li>
          <li style="margin-bottom: 0.5rem;">Send <code>/newbot</code> command and follow the instructions to name your bot.</li>
          <li style="margin-bottom: 0.5rem;">Copy the <strong>HTTP API Token</strong> provided by BotFather.</li>
          <li style="margin-bottom: 0.5rem;">Log in to KStudy, visit your <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/setup" style="color: #6C3AE8; font-weight: 600; text-decoration: none;">Setup Guide Page</a>.</li>
          <li style="margin-bottom: 0.5rem;">Paste the Bot Token and your Access Code (above) to connect Hermes AI!</li>
        </ol>

        <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem; margin-top: 2.5rem; text-align: center; font-size: 0.8rem; color: #6b7280;">
          If you have any questions, reply to this email or contact support at <a href="mailto:support@kstudy.app" style="color: #9ca3af;">support@kstudy.app</a>.
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[Mail] Email sent successfully:", info.messageId);
    return true;
  } catch (err) {
    console.error("[Mail] Error sending email:", err);
    return false;
  }
}
