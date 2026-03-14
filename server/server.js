require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolio";

// Middleware
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.warn("⚠️  MongoDB not connected:", err.message));

  const transporter = nodemailer.createTransport({
  service: "gmail",
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

// Contact route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address." });
    }

    // Save to MongoDB
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send Email
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${subject || "New Message"}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`
    });

    res.json({ success: true, message: "Message sent successfully!" });

  } catch (err) {
    console.error("Contact error:", err.message);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});


app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));