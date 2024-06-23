import React from "react";

export const ProgressComp = ({ percent }) => {
  const totalLines = 14; // Total number of lines

  // Heights of the lines
  const lineHeights = [16, 16, 36, 16, 16, 16, 36, 36, 16, 36, 16, 16, 16, 16];

  // Generate an array of lines with the correct fill color based on the percentage
  const lines = Array.from({ length: totalLines }).map((_, index) => {
    const isFilled = (index + 1) / totalLines <= percent / 100;
    const fillColor = isFilled ? "#89898B" : "#F2F3F5";

    return (
      <rect
        key={index}
        x={index * 10}
        y="26"
        width={lineHeights[index]}
        height="3"
        rx="1.5"
        transform={`rotate(-90 ${index * 10} 26)`}
        fill={fillColor}
      />
    );
  });

  return (
    <div>
      <svg
        width="133"
        height="36"
        viewBox="0 0 133 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines}
      </svg>
    </div>
  );
};
