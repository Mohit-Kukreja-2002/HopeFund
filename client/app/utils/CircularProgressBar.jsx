import { useState, useEffect } from 'react';

const CircularProgressBar = ({ percentage,size=13 }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const circumference = 2 * Math.PI * size;
    const progressOffset = circumference - (percentage / 100) * circumference;
    setOffset(progressOffset);
  }, [percentage,size]);

  return (
    <div className="relative inline-block">
      <div className="w-20 h-20 overflow-hidden text-center align-middle">
        <svg className="absolute transform -rotate-90" viewBox="0 0 36 36">
          <circle className="text-[#E8E4E4] stroke-current" cx="18" cy="18" r={`${size}`} strokeWidth="4" fill="none"></circle>
          <circle
            className="text-[#37d123] stroke-current" cx="18" cy="18" r={`${size}`} strokeWidth="4"
            fill="none"
            style={{ strokeDasharray: `${2 * Math.PI * size }px`, strokeDashoffset: `${offset}px` }}
          ></circle>
        </svg>
        
        <div className="relative w-full h-full text-center align-middle">
          <div className="absolute transform -translate-x-1/2 -translate-y-1/2 text-md top-1/2 left-1/2">{percentage}%</div>
        </div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
