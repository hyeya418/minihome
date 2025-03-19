import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";

// 장식 아이콘 목록
const decorations = [
  { id: 1, image: "/assets/deco1.png" },
  { id: 2, image: "/assets/deco2.png" },
  { id: 3, image: "/assets/deco3.png" },
  { id: 4, image: "/assets/deco4.png" },
  { id: 5, image: "/assets/deco5.png" },
  { id: 6, image: "/assets/deco6.png" },
  { id: 7, image: "/assets/deco7.png" },
  { id: 8, image: "/assets/deco8.png" },
  { id: 9, image: "/assets/deco9.png" },
  { id: 10, image: "/assets/deco10.png" },
  { id: 11, image: "/assets/deco11.png" },
  { id: 12, image: "/assets/deco12.png" },
];

const DecorationSelection = () => {
  const [selectedDeco, setSelectedDeco] = useState(null);
  const navigate = useNavigate();
  const { userId } = useParams(); // 방문한 벚꽃나무 주인 ID

  const handleSelect = (deco) => {
    setSelectedDeco(deco);
  };

  const handleNext = () => {
    if (selectedDeco) {
      navigate(`/tree/${userId}/message`, { state: { selectedDeco } });
    } else {
      alert("장식을 선택해주세요!");
    }
  };

  return (
    <div className="deco-selection-container">
      <h2>트리 장식을 선택하세요</h2>
      <div className="deco-grid">
        {decorations.map((deco) => (
          <img
            key={deco.id}
            src={deco.image}
            alt="장식"
            className={`deco-item ${selectedDeco?.id === deco.id ? "selected" : ""}`}
            onClick={() => handleSelect(deco)}
          />
        ))}
      </div>
      <button onClick={handleNext}>다음으로</button>
    </div>
  );
};

export default DecorationSelection;
