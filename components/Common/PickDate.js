"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";

const PickDate = ({ title, htmlFor, name, required = false, selectedDate, setDate }) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <label className="capitalize" htmlFor={htmlFor}>
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setDate(date)}
        dateFormat="dd-MM-yyyy"
        name={name}
        className="h-[40px] px-[8px] bg-foreground rounded-[6px] border-[.2px] border-third focus:outline-third cShadow box-border"
        placeholderText="ex. 10-10-2027"
      />
    </div>
  );
};

export default PickDate;
