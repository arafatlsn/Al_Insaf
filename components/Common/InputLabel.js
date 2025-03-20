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
  action = undefined,
  actionFor,
  required = false,
}) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <label className="capitalize" htmlFor={htmlFor}>
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="h-[40px] px-[8px] bg-foreground rounded-[6px] border-[.2px] border-primary focus:outline-primary cShadow"
        type={type}
        placeholder={placeHolder}
        name={name}
        id={id}
        value={value}
        onChange={(e) => {
          if (action === undefined) {
            return;
          }
          action(actionFor, e.target.value);
        }}
        required={required}
      />
    </div>
  );
};

export default InputLabel;
