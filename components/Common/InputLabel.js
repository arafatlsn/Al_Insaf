import React from "react";

const InputLabel = ({
  title,
  type = "text",
  htmlFor,
  name,
  id,
  placeHolder,
}) => {
  return (
    <div className="flex flex-col gap-[2px]">
      <label className="capitalize" htmlFor={htmlFor}>
        {title}
      </label>
      <input
        className="h-[40px] px-[8px] bg-foreground rounded-[6px] border-[.2px] border-third focus:outline-third cShadow"
        type={type}
        placeholder={placeHolder}
        name={name}
        id={id}
      />
    </div>
  );
};

export default InputLabel;
