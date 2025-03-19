import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, doc, setDoc, getDoc } from "../firebase";

const Home = () => {
  const [tab, setTab] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password || !nickname) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에 유저 정보 저장
      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        nickname: nickname,
        email: email
      });

      alert("미니홈이 생성되었습니다! 이제 친구들에게 공유해보세요 😊");
      navigate("/my-tree");
    } catch (error) {
      alert("회원가입 오류: " + error.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에서 유저 정보 가져오기
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        alert(`${userDoc.data().nickname}님의 미니홈에 오신 것을 환영합니다! 🌸`);
        navigate("/my-tree");
      } else {
        alert("사용자 정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      alert("로그인 오류: " + error.message);
    }
  };

  const handleTabChange = (newTab) => {
    setTab(newTab);
    // 탭 변경 시 입력 필드 초기화
    setEmail("");
    setPassword("");
    setNickname("");
  };

  return (
    <div className="home-container">
      <h1>🌸 미니홈</h1>
      <p className="home-description">
        나만의 미니홈을 만들고 친구들과 소통해보세요!
      </p>
      <div className="tab-container">
        <button 
          className={tab === "signup" ? "active" : ""} 
          onClick={() => handleTabChange("signup")}
        >
          미니홈 만들기
        </button>
        <button 
          className={tab === "login" ? "active" : ""} 
          onClick={() => handleTabChange("login")}
        >
          내 미니홈 가기
        </button>
      </div>

      {tab === "signup" ? (
        <div className="form-container">
          <input 
            type="text" 
            placeholder="미니홈에서 사용할 닉네임" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
          />
          <input 
            type="email" 
            placeholder="이메일" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleSignup}>미니홈 만들기</button>
          <p className="form-description">
            * 로그인은 미니홈 관리를 위해서만 필요합니다.<br />
            * 방명록 작성은 로그인 없이도 가능합니다.
          </p>
        </div>
      ) : (
        <div className="form-container">
          <input 
            type="email" 
            placeholder="이메일" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleLogin}>내 미니홈 가기</button>
        </div>
      )}
    </div>
  );
};

export default Home;
