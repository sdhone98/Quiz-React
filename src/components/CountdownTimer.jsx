import { useEffect, useState } from "react";

const CountdownTimer = ({ min }) => {
  const [timeLeft, setTimeLeft] = useState(min * 60);
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getBgClass = () => {
  if (timeLeft <= 60) return "bg-red-600 animate-pulse text-color-text-1 font-bold";
  if (timeLeft <= 300) return "bg-orange-500";
  return "bg-color-button-2";
};

return (
  <div className={`text-color-text-2 ${getBgClass()} text-l text-center px-4 py-1 rounded-4xl`}>
    Time Left: {formatTime(timeLeft)}
  </div>
);
};
export default CountdownTimer;
