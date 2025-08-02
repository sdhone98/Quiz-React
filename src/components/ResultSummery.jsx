import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import CountUp from "react-countup";

function ResultSummery({
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  percentage,
}) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [chnageColor, setChnageColor] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      navigate(ROUTES.STUDENT_DASHBOARD);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, navigate]);

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🎉";
    if (percentage >= 80) return "Excellent work! 👏";
    if (percentage >= 70) return "Good job! 👍";
    if (percentage >= 60) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  const getPercentageTextColor = () => {
    if (percentage >= 90) return "text-color-accent-gold";
    if (percentage >= 70) return "text-color-accent-green";
    if (percentage >= 50) return "text-color-accent-blue";
    if (percentage >= 30) return "text-color-accent-yellow";
    return "text-color-accent-red";
  };

  useEffect(() => {
    setTimeout(() => setChnageColor(true), 1000);
  }, []);

  return (
    <div className="w-screen h-full flex justify-center items-center bg-color-bg text-color-text">
      <div className="w-1/3 bg-color-bg-1 h-fit rounded-lg flex flex-col items-center p-8">
        <p className="text-sm mb-4 animate-pulse text-color-btn">
          Redirecting in {secondsLeft} seconds
        </p>
        <h3 className="text-3xl font-semibold text-color-text">
          Quiz Complete!
        </h3>
        <p className="text-lg py-4">{getScoreMessage()}</p>

        <div className="w-full p-8 bg-color-bg-2 flex flex-col justify-center items-center rounded-lg select-none">
          <p className="text-sm">Your Score</p>
          <h3
            className={`${
              chnageColor ? getPercentageTextColor() : "text-color-text"
            } text-5xl font-bold py-2 transition-colors duration-300 ease-in-out font-mono`}
          >
            <CountUp end={percentage} />%
          </h3>
          <p className="text-color-text-light text-2xl font-light font-mono">
            <CountUp end={correctAnswers} />
            /<CountUp end={totalQuestions} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultSummery;
