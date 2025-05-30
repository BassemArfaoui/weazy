import React from "react";
import "./styles/style.scss";

const InlineLoading = ({ size = 0.5 , submit }) => {
  return (
      <div
        className={`apple-loading`}
        style={{ transform: `scale(${size})` }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div className={`segment ${ submit ? "bg-black" : "bg-gray-300"}`} key={i}></div>
        ))}
      </div>
  );
};

export default InlineLoading;
