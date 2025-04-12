"use client";
import React from "react";

const Button = ({ text, action, type }) => {
  return (
    <button
      type={type}
      onClick={action}
      className="w-full h-[34px] lg:h-[36px] xl:h-[42px] text-[13px] lg:text-[14px] xl:text-[1rem] bg-primary hover:bg-success border-secondary text-white rounded-[.3rem] transation font-semibold mt-[1rem] transition-all"
    >
      {text}
    </button>
  );
};

export default Button;
