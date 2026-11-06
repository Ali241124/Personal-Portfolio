const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../server/.env") });
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with timeout (non-blocking)
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.warn("⚠️  MongoDB connection error:", err.message));
}

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

// Contact Handler
const handleContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("CRITICAL: EMAIL_USER or EMAIL_PASS environment variables are missing!");
      return res.status(500).json({
        error: "Email credentials are not configured on the deployment environment.",
      });
    }

    // Try saving to DB if MongoDB is active
    if (mongoose.connection.readyState === 1) {
      try {
        const contact = new Contact({ name, email, subject, message });
        await contact.save();
      } catch (dbErr) {
        console.warn("DB save skipped:", dbErr.message);
      }
    }

    // Send email with replyTo configured so replying goes directly to visitor
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `[Portfolio Inquiry] ${subject || "New Message from " + name}`,
      text: `You have received a new contact submission from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}\n\n(Click reply to message ${email} directly)`,
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
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact service error:", err.message);
    res.status(500).json({
      error: "Could not send message.",
      details: err.message,
    });
  }
};

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

module.exports = app;
