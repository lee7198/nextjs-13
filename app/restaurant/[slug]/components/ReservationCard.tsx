"use client";
import { useState } from "react";
import { partySize, times } from "../../../../data";

import DatePicker from "react-datepicker";
import { time } from "console";

export default function ReservationCard({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleChange = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const filterTimeByRestaurantOpenWindow = () => {
    const timesWithinWindow: typeof times = [];

    let isWithinWindow = false;

    times.forEach((time) => {
      if (time.time === openTime) isWithinWindow = true;
      if (isWithinWindow) timesWithinWindow.push(time);
      if (time.time === closeTime) isWithinWindow = false;
    });

    return timesWithinWindow;
  };

  return (
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="">
          {partySize.map((item) => (
            <option value={item.value} key={item.label}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            className="py-3 border-b font-light text-reg w-28"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light">
            {filterTimeByRestaurantOpenWindow().map((item) => (
              <option key={item.time} value={item.time}>
                {item.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">
          Find a Time
        </button>
      </div>
    </div>
  );
}
