import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { db, doc, arrayUnion, updateDoc} from "../firebase";
import "../App.css";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = useParams(); // 벚꽃나무 주인 ID
  const selectedDeco = location.state?.selectedDeco || null; // 선택한 장식

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("메시지를 입력해주세요!");
      return;
    }

    try {
      const treeDocRef = doc(db, "trees", userId);
      await updateDoc(treeDocRef, {
        decorations: arrayUnion({
          id: new Date().getTime(),
          message,
          deco: selectedDeco.image,
        }),
      });

      alert("메시지가 전달되었습니다!");
      navigate(`/tree/${userId}`);
    } catch (error) {
      console.error("메시지 저장 오류:", error);
    }
  };

  return (
    <div className="message-container">
      <h2>메시지를 남겨주세요</h2>
      <img src={selectedDeco?.image} alt="선택한 장식" className="selected-deco" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="메시지를 입력하세요"></textarea>
      <button onClick={handleSubmit}>전달하기</button>
    </div>
  );
};

export default MessageForm;
