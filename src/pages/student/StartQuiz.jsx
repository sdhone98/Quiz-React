import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import CountdownTimer from "../../components/CountdownTimer";

const StartQuiz = () => {
  const questionBank = [
    {
      question: "What is the difference between global and local scope?",
      options: {
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
      },
      option_count: 4,
    },
    {
      question: "What is the difference between global and local scope?",
      options: {
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
      },
      option_count: 4,
    },
    {
      question: "What is the difference between global and local scope?",
      options: {
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
      },
      option_count: 4,
    },
    {
      question: "What is the difference between global and local scope?",
      options: {
        option_a: "Option A",
        option_b: "Option B",
        option_c: "Option C",
        option_d: "Option D",
      },
      option_count: 4,
    },
  ];
  const navigate = useNavigate(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prev) => [...prev, answer]);
    setQuestionIndex((prev) => prev + 1);
    console.log("==========> ", answer);
  };

  if (questionIndex >= questionBank.length) {
    return <div className="text-xl p-4">Quiz Completed 🎉</div>;
  }

  return (
    <div className="w-screen h-full p-6 bg-color-background">
      <div class="w-full mb-4">
        <div className="w-full flex items-center justify-between">
          <h2 class="mb-1 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Quiz Topic
          </h2>
          <CountdownTimer min={6} />
        </div>
        <div className="w-fit flex-row justify-center">
          <span className="flex">
            <p class="text-color-text-1 sm:text-l pr-1">Difficaulty Level - </p>
            <p class="text-color-text-1 sm:text-l font-bold">Easy</p>
          </span>
          <span className="flex">
            <p class="text-color-text-1 sm:text-l pr-1">Set - </p>
            <p class="text-color-text-1 sm:text-l font-bold">A</p>
          </span>
        </div>
      </div>
      <QuizCard
        questionIndex={questionIndex}
        questionData={questionBank[questionIndex]}
        onSelect={handleAnswerSelection}
      />
    </div>
  );
};

export default StartQuiz;
