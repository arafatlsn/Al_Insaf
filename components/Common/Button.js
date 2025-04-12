"use client";
import React from "react";

const Button = ({ text, action, type }) => {
  return (
    <button
      type={type}
      onClick={action}
      className="w-full h-[42px] bg-primary hover:bg-success border-secondary text-white rounded-[.3rem] transation font-semibold mt-[1rem] transition-all"
    >
      {text}
    </button>
  );
};

export default Button;
