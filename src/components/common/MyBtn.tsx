import React from "react";

const MyBtn = ({
  name,
  width = "w-auto",
}: {
  name: string;
  width?: string;
}) => {
  return (
    <button
      className={`text-[17px] px-24 py-3 bg-primary text-black rounded-lg ${width}`}
    >
      {name}
    </button>
  );
};

export default MyBtn;
