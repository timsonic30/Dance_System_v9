"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 3, 1)) // April 2025 (0-indexed month)

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  // Get year and month in Japanese format
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1 // Convert from 0-indexed to 1-indexed
  const formattedDate = `${year}年${month.toString().padStart(2, "0")}月`

  // Days of the week in Japanese
  const weekdays = ["日", "一", "二", "三", "四", "五", "六"]

  // Generate days for the current month
  const daysInMonth = new Date(year, month, 0).getDate()
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay()

  // Create calendar grid
  const days = []
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Colors for each day of the week
const dayColors = [
  "bg-gray-100 text-black", // Sunday
  "bg-gray-100 text-black", // Monday
  "bg-gray-100 text-black", // Tuesday
  "bg-gray-100 text-black", // Wednesday
  "bg-gray-100 text-black", // Thursday
  "bg-gray-100 text-black", // Friday
  "bg-gray-100 text-black", // Saturday
]
// Apply styles for past dates and hover
const isPastDateStyle = "line-through opacity-50 text-gray-500 cursor-not-allowed"
const hoverStyle = "hover:bg-gray-300 hover:cursor-pointer"

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-lg font-medium">{formattedDate}</span>
          <button className="p-1 border rounded" aria-label="Previous month" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1 border rounded" aria-label="Next month" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {/* Weekday headers */}
        {weekdays.map((day, index) => (
          <div
            key={`header-${index}`}
            className={("h-14 flex items-center justify-center font-medium text-xl", dayColors[index])}
          >
            {day}
          </div>
        ))}

        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-14"></div>
        ))}

        {/* Calendar days */}
        {days.map((day) => {
          const date = new Date(year, month - 1, day)
          const dayOfWeek = date.getDay()
          const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0)) // Compare to today

          return (
            <div
              key={`day-${day}`}
              className={`
                h-14 border rounded flex items-center justify-center text-xl
                ${dayOfWeek === 0 || dayOfWeek === 6 ? "font-medium" : ""}
                text-${dayColors[dayOfWeek].split(" ")[1].split("-")[1]}-600
                ${isPastDate ? "line-through opacity-60 text-gray-400 cursor-not-allowed" : "hover:bg-blue-100 hover:cursor-pointer"}
              `}
              onClick={isPastDate ? undefined : () => console.log(`Clicked on ${date.toDateString()}`)} // Disable click for past dates
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}


{/*
        {/* Highlighted day */}
        <div className="bg-[#f26744] text-white p-8 flex flex-col items-center justify-center w-2/5" >
          <div className="text-6xl font-light mb-2">
            {currentDate.getDate()}
          </div>
          <div className="uppercase text-lg font-medium mb-2">
            {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(currentDate)}
          </div>
          <div className="text-base opacity-80">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <button className="mt-4 p-3 rounded-full hover:bg-[#e05634] transition-colors">
            <Edit size={20} />
          </button>
        </div>
*/}
