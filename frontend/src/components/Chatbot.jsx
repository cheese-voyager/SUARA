import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageCircle, X, Send } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Halo warga Baleendah! Ada yang bisa kami bantu? (Ketik 'KTP', 'Domisili', atau 'Antrian')", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post(`${API_URL}/chat`, { message: userMessage.text });
      setMessages(prev => [...prev, { text: res.data.reply, isBot: true }]);
    } catch (error) {
      console.error('Error sending message', error);
      setMessages(prev => [...prev, { text: "Maaf, sistem sedang gangguan.", isBot: true }]);
    }
  };

  return (
    <div className="chatbot-widget">
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageCircle size={20} /> Tanya Desa
            </span>
            <button onClick={toggleChat} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Tulis pesan Anda..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">
              <Send size={20} />
            </button>
          </form>
        </div>
      ) : (
        <div className="chatbot-toggle" onClick={toggleChat}>
          <MessageCircle size={28} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
