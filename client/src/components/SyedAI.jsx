import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function SyedAI({ onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: "Hello! I am Syed Ali Hassan's AI Assistant. Ask me about his projects, agentic workflows, machine learning models, or background.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const scrollRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) setVoices(v);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition && !recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSend(transcript);
      };
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.95;

    const naturalVoice =
      voices.find(
        (v) =>
          (v.name.toLowerCase().includes("natural") ||
            v.name.toLowerCase().includes("male") ||
            v.name.toLowerCase().includes("david") ||
            v.name.toLowerCase().includes("james") ||
            v.name.toLowerCase().includes("mark")) &&
          v.lang.startsWith("en")
      ) || voices.find((v) => v.lang.startsWith("en"));

    if (naturalVoice) utterance.voice = naturalVoice;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text) => {
    const userText = text || input;
    if (!userText.trim()) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("/jarvis", {
        message: userText,
        history: messages,
      });

      const botResponse = response.data.response;
      setMessages([...newMessages, { role: "bot", content: botResponse }]);
      speak(botResponse);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "bot",
          content:
            "I could not reach the inference backend right now. Feel free to explore the projects section or message Syed directly at syedali.hassan2040@gmail.com!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    window.speechSynthesis.cancel();
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }
      recognitionRef.current.start();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-36px)] h-[520px] z-[999] flex flex-col rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: "var(--surface-raised)",
          border: "1px solid var(--border-strong)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 18px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(9, 13, 22, 0.95)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "var(--accent-glow)",
                border: "1px solid var(--accent-ring)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                fontWeight: 700,
                color: "var(--accent-secondary)",
              }}
            >
              AI
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", display: "block" }}>
                Syed AI Assistant
              </span>
              <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--accent-secondary)" }}>
                Online & Ready
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={toggleListening}
              style={{
                background: isListening ? "rgba(239, 68, 68, 0.2)" : "rgba(255, 255, 255, 0.05)",
                border: `1px solid ${isListening ? "#ef4444" : "var(--border)"}`,
                borderRadius: 6,
                padding: "6px 8px",
                color: isListening ? "#ef4444" : "var(--text-secondary)",
                cursor: "pointer",
                fontSize: 12,
              }}
              title={isListening ? "Stop voice listening" : "Start voice listening"}
            >
              {isListening ? "Listening..." : "🎙️"}
            </button>
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                onClose?.();
              }}
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: "6px 8px",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
              title="Close Assistant"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Stream */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            padding: 16,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "var(--surface-base)",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: "85%",
                padding: "10px 14px",
                borderRadius: 12,
                fontSize: 13.5,
                lineHeight: 1.55,
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                background:
                  m.role === "user"
                    ? "var(--accent-gradient)"
                    : "var(--surface-card)",
                border: m.role === "user" ? "none" : "1px solid var(--border)",
                color: "#FFFFFF",
              }}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div
              style={{
                alignSelf: "flex-start",
                padding: "8px 14px",
                borderRadius: 12,
                background: "var(--surface-card)",
                border: "1px solid var(--border)",
                fontSize: 12,
                color: "var(--accent-secondary)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Thinking...
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            padding: 12,
            borderTop: "1px solid var(--border)",
            background: "rgba(9, 13, 22, 0.95)",
            display: "flex",
            gap: 8,
          }}
        >
          <input
            style={{
              flex: 1,
              background: "var(--surface-card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "9px 12px",
              color: "var(--text-primary)",
              fontSize: 13,
              outline: "none",
            }}
            placeholder="Ask about Syed's projects or skills..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: "8px 16px", fontSize: 13 }}
            disabled={!input.trim()}
          >
            Send
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
