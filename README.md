# Syed Ali Hassan - AI & Full-Stack Developer Portfolio 🚀

Welcome to my personal portfolio repository! This is a dynamic, fully responsive, and highly interactive portfolio built to showcase my projects, skills, and experience in Artificial Intelligence, Machine Learning, and Full-Stack Web Development.

## ✨ Features

- **Syed AI (Personal Local Assistant):** A custom-built, local AI assistant integrated directly into the portfolio. It features voice recognition (speech-to-text) and text-to-speech to talk to users and answer questions about my background, skills, and projects.
- **Interactive UI/UX:** Built with React and Framer Motion for smooth page transitions, hover effects, and a modern "glassmorphism" aesthetic.
- **Projects Showcase:** A clean, filterable grid highlighting my work across AI/ML (CNNs, BERT, YOLOv8, LangChain) and Full-Stack Web Development.
- **Working Contact Form:** A fully functional contact form powered by a Node.js/Express backend, MongoDB, and Nodemailer for seamless communication.

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Framer Motion** (for animations)
- **Tailwind CSS** (for styling)
- **Web Speech API** (for Syed AI voice interaction)

### Backend
- **Node.js & Express.js**
- **MongoDB & Mongoose** (for contact form submissions)
- **Nodemailer** (for email forwarding)
- **Custom Local RAG Engine** (for the AI assistant's knowledge base)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (running locally or a MongoDB Atlas URI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and add your environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```
   Start the backend server:
   ```bash
   npm start
   ```

3. **Setup the Frontend:**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **View the Portfolio:**
   Open your browser and navigate to `http://localhost:5173`.

## 🤝 Let's Connect
Feel free to reach out to me for collaborations, freelance work, or just to chat about AI and Web Development!
