"use client"
import React from "react";

const Button = ({ text, action }) => {
  return (
    <button onClick={action} className="w-full h-[42px] bg-button text-white hover:bg-white hover:border-[2px] hover:text-button border-button rounded-[.3rem] transation font-semibold mt-[1rem]">
      {text}
    </button>
  );
};

export default Button;
