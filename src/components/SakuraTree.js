import React, { useEffect, useState } from "react";
import { db, doc, onSnapshot } from "../firebase";
import "../App.css";

const SakuraTree = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error("❌ userId가 없습니다. 데이터 로드를 중단합니다.");
      return;
    }

    // 트리 메시지 실시간 리스너
    const unsubscribe = onSnapshot(doc(db, "trees", userId), (docSnap) => {
      if (docSnap.exists()) {
        setMessages(docSnap.data().messages || []);
      } else {
        console.warn(`⚠️ Firestore에서 userId(${userId}) 문서를 찾을 수 없습니다.`);
      }
    }, (error) => {
      console.error("🔥 Firestore에서 데이터를 가져오는 중 오류 발생:", error);
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => unsubscribe();
  }, [userId]);

  const createPetal = () => {
    const petal = document.createElement('img');
    petal.src = '/assets/petal1.png';
    petal.className = 'petal';
    petal.style.left = `${Math.random() * 100}%`;
    document.querySelector('.sakura-container').appendChild(petal);
    
    petal.addEventListener('animationend', () => {
      petal.remove();
    });
  };

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      createPetal();
    }
  };

  return (
    <div className="sakura-container" onClick={handleContainerClick}>
      <div className="tree-wrapper">
        <img src="/assets/home2.png" alt="Home" className="tree" />
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className="message-item"
            style={{ 
              left: `${Math.random() * 60 + 20}%`,
              top: `${Math.random() * 50 + 30}%`
            }}
            onClick={() => setSelectedMessage(msg)}
          >
            <img src={msg.decoration} alt="장식" className="tree-decoration" />
            <p className="nickname">{msg.nickname}</p>
          </div>
        ))}
      </div>
      {selectedMessage && (
        <div className="message-modal">
          <div className="message-content">
            <h3>{selectedMessage.nickname}님의 메시지</h3>
            <p>{selectedMessage.text}</p>
            <button onClick={() => setSelectedMessage(null)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SakuraTree;
