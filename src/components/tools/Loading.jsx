import React from "react";
import "./styles/style.scss";

const Loading = ({ size = 0.5 , submit }) => {
  return (
    <div className={`apple-loading-container center`}>
      <div
        className={`apple-loading`}
        style={{ transform: `scale(${size})` }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div className={`segment ${ submit ? "bg-black" : "bg-gray-300"}`} key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
