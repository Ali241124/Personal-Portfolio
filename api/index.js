require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";

// Middleware
app.use(cors()); // Allow all for solving connection issue
app.use(express.json());

// MongoDB connection with timeout
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.warn("⚠️  MongoDB connection error:", err.message));
} else {
  console.warn("⚠️  MONGO_URI not found. Database features will not work.");
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
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

const Contact = mongoose.model("Contact", contactSchema);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// Contact route (improved reliability)
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Debugging logs (Check Vercel Logs for these)
    console.log("Contact request received from:", email);
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("CRITICAL: EMAIL_USER or EMAIL_PASS environment variables are missing!");
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    // Try to save to DB, but don't block email if DB fails
    try {
      if (mongoose.connection.readyState === 1) {
        const contact = new Contact({ name, email, subject, message });
        await contact.save();
        console.log("Message saved to database.");
      } else {
        console.warn("MongoDB not connected. Skipping DB save.");
      }
    } catch (dbErr) {
      console.error("Database save failed:", dbErr.message);
    }

    console.log("Attempting to send email via Gmail...");
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Gmail requires 'from' to be the authenticated user
      replyTo: email, // Set user's email here so you can reply directly
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    });
    
    console.log("Email sent successfully!");
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error("Contact service error:", err.message);
    // Return a more descriptive error for debugging (User can see this in devtools)
    res.status(500).json({ 
      error: "Could not send message.",
      details: err.message.includes("Invalid login") ? "Email authentication failed. Check App Password." : "Server error."
    });
  }
});

// Syed AI Assistant Route
const { processRAGQuery } = require("../utils/ragEngine");

app.post("/jarvis", async (req, res) => {
  try {
    const { message } = req.body;
    
    // Perform RAG: Retrieve context and generate response locally
    const response = processRAGQuery(message);

    res.json({ response });

  } catch (error) {
    console.error("RAG Error:", error.message);
    res.status(500).json({ error: "My vector core is indexing. Try again!" });
  }
});


if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

module.exports = app;