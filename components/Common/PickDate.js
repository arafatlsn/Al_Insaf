"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";

const PickDate = ({
  title,
  htmlFor,
  name,
  required = false,
  selectedDate,
  setDate,
}) => {
  return (
    <div className="w-full flex flex-col gap-[2px]">
      <label
        className="capitalize text-[12px] md:text-[13px] xl:text-[14px]"
        htmlFor={htmlFor}
      >
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setDate(date)}
        dateFormat="dd-MM-yyyy"
        name={name}
        className="w-full  h-[30px] md:h-[35px] xl:h-[40px] px-[6px] lg:px-[10px] text-[12px] lg:text-[14px] bg-foreground rounded-[6px] border-[.2px] border-primary focus:outline-primary cShadow box-border"
        placeholderText="ex. 10-10-2027"
      />
    </div>
  );
};

export default PickDate;
