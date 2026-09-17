import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function SyedAI({ onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! I'm Syed's AI Assistant. How can I help you today?" }
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
    return () => { window.speechSynthesis.onvoiceschanged = null; };
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
    utterance.pitch = 0.9;
    
    const maleVoice = voices.find(v => 
      (v.name.toLowerCase().includes("male") || 
       v.name.toLowerCase().includes("david") || 
       v.name.toLowerCase().includes("james") ||
       v.name.toLowerCase().includes("mark")) && 
      v.lang.startsWith("en")
    ) || voices.find(v => v.lang.startsWith("en"));
                     
    if (maleVoice) utterance.voice = maleVoice;
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
      setMessages([...newMessages, { role: "bot", content: "Sorry, I'm currently unavailable. Please try again later." }]);
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
        alert("Speech recognition not supported in this browser.");
        return;
      }
      recognitionRef.current.start();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-48px)] h-[500px] z-[999] flex flex-col bg-white dark:bg-primary-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-primary-800 overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 dark:border-primary-800 flex justify-between items-center bg-gray-50 dark:bg-primary-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-teal/10 flex items-center justify-center text-accent-teal">
              🤖
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              Syed AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleListening} 
              className={`p-2 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                  : 'hover:bg-gray-200 dark:hover:bg-primary-800 text-gray-500'
              }`}
              title={isListening ? "Stop listening" : "Start voice input"}
            >
              {isListening ? "🛑" : "🎙️"}
            </button>
            <button 
              onClick={() => { window.speechSynthesis.cancel(); onClose?.(); }} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-primary-800 text-gray-500 transition-colors"
              title="Close Assistant"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-white dark:bg-primary-900" ref={scrollRef}>
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                m.role === 'user' 
                  ? 'self-end bg-accent-teal text-white rounded-br-sm' 
                  : 'self-start bg-gray-100 dark:bg-primary-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="self-start bg-gray-100 dark:bg-primary-800 text-gray-500 p-3.5 rounded-2xl rounded-bl-sm text-sm flex gap-1">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form 
          className="p-4 border-t border-gray-100 dark:border-primary-800 flex gap-2 bg-gray-50 dark:bg-primary-900/50" 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        >
          <input 
            className="flex-1 bg-white dark:bg-primary-800 border border-gray-200 dark:border-primary-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent-teal dark:focus:border-accent-teal text-gray-900 dark:text-white"
            placeholder="Ask me anything..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-accent-teal text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors shadow-sm disabled:opacity-50"
            disabled={!input.trim()}
          >
            Send
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
