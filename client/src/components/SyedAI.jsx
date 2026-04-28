import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

export default function SyedAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm Syed's AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Text to Speech with Fixed Voice
  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Pick ONE consistent voice and stick to it
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => v.name.includes("Google UK English Male")) || 
                    voices.find(v => v.lang === "en-GB") || 
                    voices.find(v => v.lang === "en-US") ||
                    voices[0];
                    
    if (preferred) utterance.voice = preferred;
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
        history: messages
      });
      
      const botResponse = response.data.response;
      setMessages([...newMessages, { role: "bot", content: botResponse }]);
      speak(botResponse);
    } catch (error) {
      setMessages([...newMessages, { role: "bot", content: "Sorry, I lost connection to my neural core. Try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      window.speechSynthesis.cancel(); // Stop AI from speaking
    } else {
      if (!recognition) {
        alert("Speech recognition not supported in this browser.");
        return;
      }
      recognition.start();
    }
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
  }, [messages]);

  return (
    <>
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 1000 }}>
        <motion.div
          className={`jarvis-orb ${isListening ? "listening" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isListening ? "🎙️" : "🤖"}
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-panel glass"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div style={{ padding: "16px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, background: "var(--gradient-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                SYED AI
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                 <button onClick={toggleListening} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px" }}>
                  {isListening ? "🛑" : "🎙️"}
                </button>
                <button onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "white" }}>✕</button>
              </div>
            </div>

            <div className="chat-messages" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`message ${m.role}`}>
                  {m.content}
                </div>
              ))}
              {loading && <div className="message bot">Thinking...</div>}
            </div>

            <form className="chat-input" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
              <input 
                placeholder="Ask me about Syed's projects..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="btn-primary" style={{ padding: "8px 16px" }}>Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
