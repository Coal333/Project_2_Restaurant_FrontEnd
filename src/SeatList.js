import React from "react";
import SeatItem from "./SeatItem";
import "./SeatList.css";

const SeatList = ({ seatCount, seatStatuses, onSeatStatusChange }) => {
  // seatCount만큼의 배열 생성 (1부터 시작하는 인덱스 사용)
  const seats = Array.from({ length: seatCount }, (_, i) => i + 1);

  return (
    <ul className="seat-list">
      {seats.map((seat) => (
        <SeatItem
          key={seat}
          seatNumber={seat}
          isChecked={seatStatuses[seat]} // 각 좌석의 체크 상태
          onStatusChange={onSeatStatusChange} // 상태 변경 핸들러 전달
        />
      ))}
    </ul>
  );
};

export default SeatList;
