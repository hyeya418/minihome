import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, doc, onSnapshot } from "../firebase";
import SakuraTree from "../components/SakuraTree";
import MessageForm from "../components/MessageForm";

const OtherTree = () => {
  const { userId } = useParams();
  const [nickname, setNickname] = useState("");
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    if (!userId) return;

    // 사용자 정보 실시간 리스너
    const unsubscribeUser = onSnapshot(doc(db, "users", userId), (userDoc) => {
      if (userDoc.exists()) {
        setNickname(userDoc.data().nickname);
      }
    });

    // 트리 메시지 실시간 리스너
    const unsubscribeTree = onSnapshot(doc(db, "trees", userId), (treeDoc) => {
      if (treeDoc.exists()) {
        const messages = treeDoc.data().messages || [];
        setMessageCount(messages.length);
      }
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => {
      unsubscribeUser();
      unsubscribeTree();
    };
  }, [userId]);

  return (
    <div>
      <h2 className="page-title">{nickname}님의 미니홈</h2>
      <div className="message-count">
        이 미니홈에 <span>{messageCount}개</span>의 메시지가 있어요!
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="action-button" onClick={() => setShowMessageForm(true)}>
          방명록 남기기
        </button>
      </div>

      {showMessageForm && <MessageForm userId={userId} onClose={() => setShowMessageForm(false)} />}
      <SakuraTree userId={userId} />
    </div>
  );
};

export default OtherTree;
