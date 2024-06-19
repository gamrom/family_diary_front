export const ProgressComp = ({ percent }) => {
  const totalLines = 22; // Total number of lines

  // Generate an array of lines with the correct fill color based on the percentage
  const lines = Array.from({ length: totalLines }).map((_, index) => {
    const x1 = 2.5 + index * 10;
    const y1 = [
      26.7064, 20.5653, 27.007, 20.5228, 21.8706, 18.9572, 27.3046, 27.0339,
      21.4368, 24.1018, 21.8003, 23.5321, 23.6719, 26.7064, 20.5653, 27.007,
      20.5228, 21.8706, 18.9572, 27.3046, 27.0339, 21.4368,
    ][index];
    const y2 = [
      3.09797, 9.23932, 2.79737, 9.28201, 7.93396, 10.8477, 2.49995, 2.77073,
      8.36784, 5.70273, 8.00415, 6.27251, 6.13263, 3.09797, 9.23932, 2.79737,
      9.28201, 7.93396, 10.8477, 2.49995, 2.77073, 8.36784,
    ][index];
    const isFilled = (index + 1) / totalLines <= percent / 100;
    return (
      <line
        key={index}
        x1={x1}
        y1={y1}
        x2={x1}
        y2={y2}
        stroke={isFilled ? "white" : "#D9D9D9"}
        strokeOpacity="0.9"
        strokeWidth="5"
        strokeLinecap="round"
      />
    );
  });

  return (
    <div>
      <svg
        width="215"
        height="30"
        viewBox="0 0 215 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines}
      </svg>
    </div>
  );
};
