"use client"

import { useState } from "react"

// 時間段生成函式
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 9; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const startTime = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      const endMinute = (minute + 30) % 60;
      const endHour = minute + 30 >= 60 ? hour + 1 : hour;
      const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;
      slots.push(`${startTime}-${endTime}`);
    }
  }
  return slots;
};


export default function Calendar({
  date = new Date(2025, 2, 31), // 預設日期
  onTimeSelect,
  className,  
}) {
  const [selectedTimes, setSelectedTimes] = useState([]); // 使用陣列儲存多個選中的時間
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState(new Date()); // 初始化為今天的日期
  const [selectedRoom, setSelectedRoom] = useState("Room X"); // 預設選中的房間
  const timeSlots = generateTimeSlots();
  const [excludedTimes, setExcludedTimes] = useState({
    "Room X": [],
    "Room L": [],
    "Room XL": [],
  });

  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
  ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

 const formatDate = (date = new Date()) => { // 預設為今天
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${dayOfWeek}— ${day}/${month}/${year}`;
};



  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      setClickedDate(newDate);
  
      // 格式化為本地時間的 YYYY-MM-DD
      const formattedDate = newDate.toLocaleDateString("en-CA");
  
      // 發送 POST 請求到後端 API
      fetch("http://localhost:3030/danceClass/roomRentalCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: formattedDate }),
      })
        .then((response) => response.json())
        .then((data) => {
          // 處理後端返回的資料，更新 excludedTimes
          const updatedExcludedTimes = {
            "Room X": [],
            "Room L": [],
            "Room XL": [],
          };          
  
          data.checkDay.forEach((item) => {
            if (!updatedExcludedTimes[item.roomType]) {
              updatedExcludedTimes[item.roomType] = [];
            }
            updatedExcludedTimes[item.roomType].push(...item.timeRange);
          });
  
          
// 處理邏輯：依照條件將時間範圍轉移到其他房間
          // 如果 Room XL 的 array 大於 0
          if (updatedExcludedTimes["Room XL"].length > 0) {
            updatedExcludedTimes["Room L"].push(...updatedExcludedTimes["Room XL"]);
            updatedExcludedTimes["Room X"].push(...updatedExcludedTimes["Room XL"]);
          }

          // 如果 Room X 的 array 大於 0
          if (updatedExcludedTimes["Room X"].length > 0) {
            updatedExcludedTimes["Room XL"].push(...updatedExcludedTimes["Room X"]);
          }

          // 如果 Room L 的 array 大於 0
          if (updatedExcludedTimes["Room L"].length > 0) {
            updatedExcludedTimes["Room XL"].push(...updatedExcludedTimes["Room L"]);
          }

          // 去重處理（如果不希望時間段重複）
          for (let room in updatedExcludedTimes) {
            updatedExcludedTimes[room] = [...new Set(updatedExcludedTimes[room])];
          }

          // 更新狀態
          setExcludedTimes(updatedExcludedTimes);
          console.log("Updated Excluded Times:", updatedExcludedTimes);

        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  };
  
  

  const handleTimeSelect = (time) => {
    setSelectedTimes((prevSelectedTimes) => {
      // 如果時間已被選中，移除它；否則新增它
      if (prevSelectedTimes.includes(time)) {
        return prevSelectedTimes.filter((selectedTime) => selectedTime !== time);
      } else {
        return [...prevSelectedTimes, time];
      }
    });

    // 傳遞選中時間陣列給外部函式
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room); // 更新選中的房間
  };

  const handleLogData = async () => {
    // 手動調整日期，移除時區影響
    const localDate = new Date(clickedDate.getTime() - clickedDate.getTimezoneOffset() * 60000);
    const formattedDate = localDate.toISOString().split("T")[0];

    // 收集資料並打印到控制台
    console.log("Clicked Date:", formattedDate);
    console.log("Selected Times:", selectedTimes);
    console.log("Selected Room:", selectedRoom);

    const queryParams = {
        date: formattedDate, // 使用調整後的日期
        TimeRanges: selectedTimes,
        room: selectedRoom,
    };

    try {
        const response = await fetch("http://localhost:3030/danceClass/roomRentalRegister", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(queryParams), // 傳送資料
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Server Response:", data);
            alert("場地已預訂！");
            window.location.reload();
        } else {
            console.error("後端返回錯誤:", response.status);
            alert("資料送達失敗！");
        }
    } catch (error) {
        console.error("POST 請求失敗:", error);
        alert("發生錯誤，無法送達資料！");
    }
};
 

const formattedClickedDate = clickedDate 
  ? formatDate(clickedDate) // 如果有選中的日期，格式化選中日期
  : formatDate(new Date()); // 如果未選中日期，使用今天的日期  
console.log(formattedClickedDate);

  return (
    <div>


      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row mx-auto rounded-lg overflow-hidden mt-12 w-2/3 mb-12 shadow-white shadow-2xl">
          <div className="bg-gray-900 text-white p-12 w-5/5">
            <div className="flex items-center text-6xl font-bold justify-between mb-12 mt-4">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-800 rounded" aria-label="Previous Month">
                &lt;
              </button>
              <h2 className="text-4xl font-bold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-800 rounded" aria-label="Next Month">
                &gt;
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center text-2xl font-bold text-gray-300">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {days.map((day, index) => (
                <div key={`outer-${index}`} className="flex items-center justify-center">
                  <div
                    key={`inner-${index}`}
                    className={`
                      h-12 w-12 flex items-center justify-center text-2xl rounded-full
                      ${
                        day === clickedDate.getDate() &&
                        currentDate.getMonth() === clickedDate.getMonth()
                          ? "bg-gray-700"
                          : ""
                      }
                      ${day === null ? "invisible" : ""}
                      ${day !== null ? "hover:bg-gray-800 cursor-pointer" : ""}
                    `}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 房間選擇按鈕 */}      
      <div className="flex justify-center mb-6">
        <button
          onClick={() => handleRoomSelect("Room X")}
          className={`px-4 py-2 mr-4 border rounded-md transition-all ${
            selectedRoom === "Room X" ? "bg-primary text-primary-foreground" : "bg-background"
          } hover:bg-secondary hover:text-secondary-foreground hover:scale-105`}
        >
          Room X
        </button>
        <button
          onClick={() => handleRoomSelect("Room L")}
          className={`px-4 py-2 mr-4 border rounded-md transition-all ${
            selectedRoom === "Room L" ? "bg-primary text-primary-foreground" : "bg-background"
          } hover:bg-secondary hover:text-secondary-foreground hover:scale-105`}
        >
          Room L
        </button>
        <button
          onClick={() => handleRoomSelect("Room XL")}
          className={`px-4 py-2 border rounded-md transition-all ${
            selectedRoom === "Room XL" ? "bg-primary text-primary-foreground" : "bg-background"
          } hover:bg-secondary hover:text-secondary-foreground hover:scale-105`}
        >
          Room XL
        </button>
      </div>

      <div className={`${className} w-full max-w-4xl mx-auto p-4`}>
        <h2 className="text-xl font-medium mb-2">{formattedClickedDate}</h2>
        <p className="mb-4 text-muted-foreground">請選擇開始時間</p>



        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
  {timeSlots.map((time) => {
    // 根據當前選中的房間過濾禁用的時間
    const isExcluded = excludedTimes[selectedRoom]?.includes(time); // 檢查排除時間
    const isSelected = selectedTimes.includes(time); // 檢查是否已選中

    return (
      <button
        id="timeSelect"
        key={time}
        onClick={() => !isExcluded && handleTimeSelect(time)} // 禁用按鈕不觸發點擊事件
        disabled={isExcluded} // 禁用按鈕
        className={`py-2 px-3 border rounded-md transition-all ${
          isExcluded
            ? "bg-gray-300 text-gray-500 cursor-not-allowed" // 禁用樣式
            : isSelected
            ? "bg-primary text-primary-foreground" // 已選中樣式
            : "bg-background" // 默認樣式
        } hover:bg-secondary hover:text-secondary-foreground hover:scale-105`}
      >
        {time}
      </button>
    );
  })}
</div>



        {/* 新增收集資料的按鈕 */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogData} // 收集並打印資料
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-all shadow-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}