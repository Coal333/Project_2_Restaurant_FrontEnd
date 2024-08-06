import React, { useState, useEffect } from "react";
import SeatList from "./SeatList";
import "./App.css";

const App = () => {
  // 상태 관리
  const [storeName, setStoreName] = useState(""); // 매장명 상태
  const [seatCount, setSeatCount] = useState(0); // 총 좌석 수 상태
  const [seatStatuses, setSeatStatuses] = useState({}); // 각 좌석의 상태를 관리하는 객체
  const [isDirty, setIsDirty] = useState(false); // 변경사항 추적을 위한 상태

  // 좌석 수가 변경될 때마다 실행되는 효과
  useEffect(() => {
    const initialStatuses = {};
    for (let i = 1; i <= seatCount; i++) {
      initialStatuses[i] = false; // 모든 좌석을 초기에 체크 해제 상태로 설정
    }
    setSeatStatuses(initialStatuses);
    setIsDirty(true); // 좌석 수가 변경되면 isDirty를 true로 설정
  }, [seatCount]);

  // 좌석 수 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setSeatCount(value);
      setIsDirty(true);
    }
  };

  // 좌석 수 증가 핸들러
  const incrementSeatCount = () => {
    setSeatCount(prevCount => prevCount + 1);
    setIsDirty(true);
  };

  // 좌석 수 감소 핸들러
  const decrementSeatCount = () => {
    setSeatCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
    setIsDirty(true);
  };

  // 개별 좌석 상태 변경 핸들러
  const handleSeatStatusChange = (seatNumber, isChecked) => {
    setSeatStatuses(prevStatuses => ({
      ...prevStatuses,
      [seatNumber]: isChecked
    }));
    setIsDirty(true);
  };

  // 매장명 변경 핸들러
  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
    setIsDirty(true);
  };

  // 백엔드로 데이터 전송 함수
  const sendDataToBackend = () => {
    const dataToSend = { storeName, seatStatuses };
    
    // 콘솔에 전송될 데이터 출력
    console.log("전송될 데이터:", dataToSend);

    fetch("/api/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    }).then(() => {
      setIsDirty(false); // 데이터 전송 후 isDirty를 false로 설정
      // alert("데이터가 성공적으로 전송되었습니다.");
    }).catch(error => {
      console.error("데이터 전송 중 오류 발생:", error);
      alert("데이터 전송 중 오류가 발생했습니다.");
    });
  };

  return (
    <div className="app-container">
      <h1>매장 좌석 관리</h1>
      <div className="store-name-input">
        <label htmlFor="storeName">매장명:</label>
        <input
          type="text"
          id="storeName"
          value={storeName}
          onChange={handleStoreNameChange}
          placeholder="매장명을 입력하세요"
        />
      </div>
      <div className="seat-input">
        <button onClick={decrementSeatCount}>-</button>
        <input type="number" value={seatCount} onChange={handleInputChange} />
        <button onClick={incrementSeatCount}>+</button>
      </div>
      <SeatList
        seatCount={seatCount}
        seatStatuses={seatStatuses}
        onSeatStatusChange={handleSeatStatusChange}
      />
      <button 
        className="submit-button" 
        onClick={sendDataToBackend} 
        disabled={!isDirty}
      >
        입력
      </button>
    </div>
  );
};

export default App;