import React from "react";
import "./Loader.css";

const Loader = ({height}) => {
  return (
    <div className={`flex items-center justify-center ${height?`h-[${height}px]`:"h-screen"}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
