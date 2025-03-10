"use client";
import React from "react";

const InputLabel = ({
  title,
  type = "text",
  htmlFor,
  name,
  id,
  placeHolder,
  value,
  action,
  actionFor,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <label className="capitalize" htmlFor={htmlFor}>
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="h-[40px] px-[8px] bg-foreground rounded-[6px] border-[.2px] border-third focus:outline-third cShadow"
        type={type}
        placeholder={placeHolder}
        name={name}
        id={id}
        value={value}
        onChange={(e) => action(actionFor, e.target.value)}
        required={required}
      />
    </div>
  );
};

export default InputLabel;
