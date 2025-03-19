import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, doc, onSnapshot } from "../firebase";
import SakuraTree from "../components/SakuraTree";

const MyTree = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState("");
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/");
      return;
    }

    // 사용자 정보 실시간 리스너
    const unsubscribeUser = onSnapshot(doc(db, "users", user.uid), (userDoc) => {
      if (userDoc.exists()) {
        setNickname(userDoc.data().nickname);
        setUserId(userDoc.data().userId);
      }
    });

    // 트리 메시지 실시간 리스너
    const unsubscribeTree = onSnapshot(doc(db, "trees", user.uid), (treeDoc) => {
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
  }, [navigate]);

  const shareLink = `${window.location.origin}/tree/${userId}`;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      alert('미니홈 주소가 복사되었습니다! 친구들에게 공유해보세요 😊');
    } catch (error) {
      alert('주소 복사에 실패했습니다. 다시 시도해주세요.');
      console.error('클립보드 복사 실패:', error);
    }
  };

  return (
    <div>
      <h2 className="page-title">{nickname}님의 미니홈</h2>
      <div className="message-count">
        내 미니홈에 <span>{messageCount}개</span>의 메시지가 도착했어요!
      </div>
      <div style={{ textAlign: 'center' }}>
        <button className="action-button" onClick={handleShare}>
          미니홈 공유하기
        </button>
      </div>
      <SakuraTree userId={userId} />
    </div>
  );
};

export default MyTree;
