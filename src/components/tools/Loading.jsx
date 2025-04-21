import React from "react";
import "./styles/style.scss";

const Loading = ({ size = 0.5 }) => {
  return (
    <div className={`apple-loading-container center`}>
      <div
        className={`apple-loading`}
        style={{ transform: `scale(${size})` }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div className="segment" key={i}></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
