import React, { useState } from "react";
import { db, doc, setDoc, getDoc } from "../firebase";
import "../App.css";

const MessageForm = ({ userId, onClose }) => {
  const [message, setMessage] = useState("");
  const [nickname, setNickname] = useState("");
  const [selectedDecoration, setSelectedDecoration] = useState("");

  const decorations = [
    "/assets/deco1.png", "/assets/deco2.png", "/assets/deco3.png",
    "/assets/deco4.png", "/assets/deco5.png", "/assets/deco6.png",
    "/assets/deco7.png", "/assets/deco8.png", "/assets/deco9.png",
    "/assets/deco10.png", "/assets/deco11.png", "/assets/deco12.png"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message || !selectedDecoration || !nickname) {
      alert("메시지, 닉네임, 장식을 모두 입력해주세요!");
      return;
    }

    try {
      const userTreeRef = doc(db, "trees", userId);
      const docSnap = await getDoc(userTreeRef);
      
      // 현재 메시지 목록 가져오기
      const currentMessages = docSnap.exists() ? docSnap.data().messages || [] : [];
      
      // 새로운 메시지 추가
      const newMessage = {
        text: message,
        nickname: nickname,
        decoration: selectedDecoration,
        timestamp: new Date()
      };

      // 기존 메시지 목록에 새 메시지 추가
      const updatedMessages = [...currentMessages, newMessage];

      // Firestore 업데이트
      await setDoc(userTreeRef, {
        messages: updatedMessages
      });
  
      alert("메시지가 추가되었습니다!");
      onClose();
    } catch (error) {
      console.error("🔥 메시지 추가 중 오류 발생:", error);
      alert("메시지를 추가하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="message-modal">
      <div className="message-content">
        <h3>메시지를 남겨주세요</h3>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하세요"
          className="nickname-input"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="여기에 메시지를 입력하세요!"
        />

        <h4>장식 선택</h4>
        <div className="decoration-container">
          {decorations.map((decor, index) => (
            <img
              key={index}
              src={decor}
              alt="장식"
              className={`decoration ${selectedDecoration === decor ? "selected" : ""}`}
              onClick={() => setSelectedDecoration(decor)}
            />
          ))}
        </div>

        <button onClick={handleSubmit}>메시지 추가</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default MessageForm;
