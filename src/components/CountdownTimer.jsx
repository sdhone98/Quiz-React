import { useEffect, useState } from "react";

const CountdownTimer = ({ min, onTimeOver }) => {
  const [timeLeft, setTimeLeft] = useState(min * 60);
  useEffect(() => {
    if (timeLeft <= 0) return onTimeOver(true);

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
  if (timeLeft <= 60) return "animate-pulse text-red-600";
  if (timeLeft <= 300) return "text-orange-500";
  return "text-color-text";
};

return (
  <div className={`${getBgClass()} text-md font-bold text-center rounded-lg flex items-center`}>
    Time Left: {formatTime(timeLeft)}
  </div>
);
};
export default CountdownTimer;
