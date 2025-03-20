"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Edit } from "lucide-react"

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());


  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()
  // Adjust for Monday as first day of week (0 = Monday, 6 = Sunday)
  const firstDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

  // Get the number of days in the month
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  // Create calendar days array
  const days = []
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null)
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  return (

<div className="flex justify-center">
  <div className="flex flex-col md:flex-row mx-auto rounded-lg overflow-hidden mt-12 w-2/3 mb-12 shadow-white shadow-2xl"> {/* 添加陰影 */}
    
    {/* Calendar section */}
    <div className="bg-gray-900 text-white p-12 w-5/5">

      {/* Month navigation */}
      <div className="flex items-center text-6xl font-bold justify-between mb-12 mt-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-800 rounded">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-4xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-800 rounded">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="text-center text-2xl font-bold text-gray-300">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, index) => (
          <div key={`outer-${index}`} className="flex items-center justify-center">
            <div
              key={`inner-${index}`}
              className={`
                h-12 w-12 flex items-center justify-center text-2xl rounded-full
                ${day === currentDate.getDate() ? "bg-gray-700" : ""}
                ${day === null ? "invisible" : ""}
                ${day !== null ? "hover:bg-gray-800 cursor-pointer" : ""}
              `}
              onClick={() => day && setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
            >
              {day}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
  )
}

