import React, { useEffect, useState } from "react";
import CustomBtn from "./CustomBtn";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

function ResultSummery({
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  percentage,
}) {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(5);

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

  const bottomCorrectIcon = (
    <svg
      className="w-10 h-10 text-color-accent-green"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
    </svg>
  );

  const bottomCloseIcon = (
    <svg
      className="w-10 h-10 text-color-accent-red"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
    </svg>
  );

  return (
    <div className="w-screen h-full flex justify-center items-center bg-color-bg text-color-text">
      <div className="w-1/3 bg-color-bg-1 h-fit rounded-lg flex flex-col items-center p-8">
        <p className="text-sm mb-4 animate-pulse text-color-btn">Redirecting in {secondsLeft} seconds...</p>
        <h3 className="text-3xl font-semibold text-color-text">
          Quiz Complete!
        </h3>
        <p className="text-lg py-4">{getScoreMessage()}</p>

        <div className="w-full p-8 bg-color-bg-2 flex flex-col justify-center items-center rounded-lg select-none">
          <p className="text-sm">Your Score</p>
          <h3 className="text-5xl font-bold py-2">
            {correctAnswers}/{totalQuestions}
          </h3>
          <p className="text-2xl font-light">{percentage}%</p>
        </div>

        <div className="w-full flex gap-4 mt-4">
          <div className="w-1/2 h-fit rounded-lg flex flex-col justify-center items-center bg-color-bg-2 py-6">
            {bottomCorrectIcon}
            <p className="text-sm py-2">Correct</p>
            <p className="text-sm font-semibold text-color-accent-green">
              {correctAnswers}
            </p>
          </div>

          <div className="w-1/2 h-fit rounded-lg flex flex-col justify-center items-center bg-color-bg-2 py-6">
            {bottomCloseIcon}
            <p className="text-sm py-2">Incorrect</p>
            <p className="text-sm font-semibold text-color-accent-red">
              {incorrectAnswers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultSummery;
