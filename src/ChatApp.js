import React, { useState } from "react";
import "./ChatApp.css";

const responses = [
  "Hey there!",
  "How are you?",
  "Nice to meet you!",
  "That’s interesting!",
  "Tell me more!",
];

const getCurrentTime = () => {
  const now = new Date();
  return now.toLocaleTimeString();
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState("");
  const [isNameSet, setIsNameSet] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(3);

  const sendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMsg = {
      sender: name,
      avatar: name.charAt(0).toUpperCase(),
      text: inputMessage,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");

    // Simulated auto-response
    const responseText = responses[Math.floor(Math.random() * responses.length)];
    const botMsg = {
      sender: "AI",
      avatar: "A",
      text: responseText,
      time: getCurrentTime(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleNameSubmit = () => {
    if (name.trim()) setIsNameSet(true);
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {!isNameSet ? (
        <div className="name-input-container">
          <h2>Enter your name to join chat</h2>
          <input
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleNameSubmit}>Join Chat</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <h2>Real-Time Chat App (UI Only)</h2>
            <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "🌙" : "☀️"}
            </div>
          </div>
          <div className="online-users">Online Users: {onlineUsers}</div>
          <div className="chat-box">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-message ${msg.sender === name ? "user" : "bot"}`}
              >
                <div className="message-content">
                  <span className="time">{msg.time}</span>
                  <span className="text">{msg.text}</span>
                </div>
                <div className="avatar">{msg.avatar}</div>
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
