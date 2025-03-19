import React, { useState } from "react";
import "../App.css";

const Petal = ({ x, y, image }) => {
  const [message, setMessage] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handlePetalClick = () => {
    setShowInput(true);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    setShowInput(false);
  };

  return (
    <div style={{ position: "absolute", left: x, top: y }}>
      <img src={image} alt="Sakura Petal" className="petal" onClick={handlePetalClick} />
      
      {showInput && (
        <form onSubmit={handleMessageSubmit} className="message-form">
          <input
            type="text"
            className="message-input"
            placeholder="메시지를 입력하세요!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">✅</button>
        </form>
      )}

      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Petal;
