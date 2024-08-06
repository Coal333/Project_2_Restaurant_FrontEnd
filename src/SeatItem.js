import React from "react";
import "./SeatItem.css";

const SeatItem = ({ seatNumber, isChecked, onStatusChange }) => {
  // 체크 버튼 클릭 핸들러
  const handleCheck = () => {
    onStatusChange(seatNumber, true);
  };

  // 체크 버튼 해제 핸들러
  const handleUncheck = () => {
    onStatusChange(seatNumber, false);
  };

  return (
    <li className="seat-item">
      <span className="seat-number">{seatNumber}</span>
      <div className="seat-buttons">
        <button
          className="check-button"
          onClick={handleCheck}
          disabled={isChecked} // 이미 체크된 경우 : 비활성화
        >
          ✔
        </button>
        <button
          className="uncheck-button"
          onClick={handleUncheck}
          disabled={!isChecked} // 체크되지 않은 경우 : 비활성화
        >
          ✖
        </button>
      </div>
    </li>
  );
};

export default SeatItem;
