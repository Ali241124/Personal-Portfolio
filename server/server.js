const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (optional - does not block email if offline)
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.warn("⚠️  MongoDB offline (continuing without DB):", err.message));
} else {
  console.log("ℹ️  MONGO_URI not provided. Running in direct email-forwarding mode.");
}

// Nodemailer Transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxLength: 100 },
    email: { type: String, required: true, trim: true, maxLength: 200 },
    subject: { type: String, trim: true, maxLength: 200 },
    message: { type: String, required: true, trim: true, maxLength: 2000 },
  },
  { timestamps: true }
);

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
  });
});

// Contact handler logic
const handleContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables.");
      return res.status(500).json({
        error: "Email service is not configured on the server. Please check environment variables.",
      });
    }

    // Try saving to MongoDB if connected, but never fail the user if DB is down
    if (mongoose.connection.readyState === 1) {
      try {
        const contact = new Contact({ name, email, subject, message });
        await contact.save();
        console.log("✅ Message saved to database.");
      } catch (dbErr) {
        console.warn("⚠️ DB save skipped:", dbErr.message);
      }
    }

    // Dispatch email to your inbox
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio Inquiry] ${subject || "New Message from " + name}`,
      text: `You have received a new contact submission from your portfolio website:

Name: ${name}
Email: ${email}
Subject: ${subject || "N/A"}

Message:
${message}
--------------------------------------------------
(You can reply directly to this email to respond to ${name})`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #6366f1; padding-bottom: 12px;">New Portfolio Contact</h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600; width: 90px;">From:</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-weight: 600;">Subject:</td>
              <td style="padding: 8px 0; color: #0f172a;">${subject || "No Subject"}</td>
            </tr>
          </table>
          <div style="background: #f8fafc; border-left: 4px solid #6366f1; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
            <p style="margin: 0; color: #1e293b; white-space: pre-wrap; font-size: 15px; line-height: 1.6;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #94a3b8; margin: 0;">Hit "Reply" in your email client to respond directly to ${email}.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email successfully delivered to ${process.env.EMAIL_USER} from ${email}`);

    res.json({ success: true, message: "Your message has been delivered to Syed Ali Hassan!" });
  } catch (err) {
    console.error("Contact send error:", err.message);
    res.status(500).json({
      error: "Could not deliver email.",
      details: err.message,
    });
  }
};

// Accept both /contact and /api/contact
app.post("/contact", handleContact);
app.post("/api/contact", handleContact);

// Syed AI Assistant Route
try {
  const { processRAGQuery } = require("../utils/ragEngine");
  app.post("/jarvis", async (req, res) => {
    try {
      const { message } = req.body;
      const response = processRAGQuery(message);
      res.json({ response });
    } catch (error) {
      console.error("RAG Error:", error.message);
      res.status(500).json({ error: "RAG engine unavailable." });
    }
  });
} catch (e) {
  console.warn("RAG engine not initialized:", e.message);
}

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
