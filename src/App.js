import React, { useState, useEffect } from "react";
import SeatList from "./SeatList";
import "./App.css";

const App = () => {
  const [storeName, setStoreName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [seatCount, setSeatCount] = useState(0);
  const [seatStatuses, setSeatStatuses] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const initialStatuses = {};
    for (let i = 1; i <= seatCount; i++) {
      initialStatuses[i] = false;
    }
    setSeatStatuses(initialStatuses);
    setIsDirty(true);
  }, [seatCount]);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setSeatCount(value);
      setIsDirty(true);
    }
  };

  const incrementSeatCount = () => {
    setSeatCount(prevCount => prevCount + 1);
    setIsDirty(true);
  };

  const decrementSeatCount = () => {
    setSeatCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
    setIsDirty(true);
  };

  const handleSeatStatusChange = (seatNumber, isChecked) => {
    setSeatStatuses(prevStatuses => ({
      ...prevStatuses,
      [seatNumber]: isChecked
    }));
    setIsDirty(true);
  };

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
    setIsDirty(true);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setIsDirty(true);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setIsDirty(true);
  };

  const sendDataToBackend = async () => {
    const dataToSend = {
      storeName,
      location,
      phoneNumber,
      seats: seatCount
    };

    console.log("데이터:", dataToSend);

    try {
      const response = await fetch("http://localhost:8080/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${errorText}`);
      }

      const result = await response.json();
      console.log("응답:", result);

      alert("성공");
      setIsDirty(false);
    } catch (error) {
      console.error("실패", error);
      alert("실패");
    }
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
          placeholder="매장명"
        />
      </div>
      <div className="location-input">
        <label htmlFor="location">위치:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
          placeholder="위치"
        />
      </div>
      <div className="phone-number-input">
        <label htmlFor="phoneNumber">전화번호:</label>
        <input
          type="text"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="전화번호"
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
