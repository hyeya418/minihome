import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase';
import '../App.css';

const Header = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const goToMyTree = () => {
    if (user) {
      navigate('/my-tree');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          🌸 미니홈
        </h1>
        {user && (
          <div className="header-buttons">
            <button className="my-tree-button" onClick={goToMyTree}>
              마이홈
            </button>
            <button className="logout-button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 