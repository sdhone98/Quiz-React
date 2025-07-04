import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import CountdownTimer from "../../components/CountdownTimer";
import PopUp from "../../components/PopUp";

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
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prev) => [...prev, answer]);
    setQuestionIndex((prev) => prev + 1);
  };

  const closePopUpFn = () => {
    setIsQuizEnd(false);
  };

  if (isTimeOver === true)
    return (
      <PopUp
        mainMsg={"Time's Up!"}
        subMsg={
          "Your quiz session has ended. Your answers have been submitted automatically. Thanks for participating. You may now view your results or exit."
        }
        btn1Msg={"Okay"}
        btn2Msg={null}
        showCancel={false}
        onCancel={closePopUpFn}
        onConfirm={() => navigate("/student/dashboard")}
      />
    );

  if (isQuizEnd === true)
    return (
      <PopUp
        mainMsg={"Are you sure you want to end the quiz?"}
        subMsg={
          "Your progress will be saved and you won't be able to attempt the remaining questions. Please confirm to exit or cancel to continue the quiz."
        }
        btn1Msg={"Continue"}
        btn2Msg={"End Quiz"}
        showCancel={true}
        onCancel={closePopUpFn}
        onConfirm={() => navigate("/student/dashboard")}
      />
    );

  if (questionIndex >= questionBank.length)
    return (
      <PopUp
        mainMsg={"All Done!"}
        subMsg={
          "Great job! You've reached the end of the quiz. You can now view your results or return to the dashboard."
        }
        btn1Msg={"Submit"}
        btn2Msg={"btn2"}
        showCancel={false}
        onCancel={closePopUpFn}
        onConfirm={() => navigate("/student/dashboard")}
      />
    );

  return (
    <div className="w-screen h-full py-6 px-10 bg-color-background">
      <div class="w-full mb-4">
        <div className="w-full flex items-center justify-between">
          <h2 class="mb-1 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Quiz Topic
          </h2>
          <div className="w-fit flex flex-row gap-2">
            <button
              type="button"
              className="py-2 px-4 w-fit text-sm font-medium bg-color-button-1 text-color-text-2 rounded-lg hover:cursor-pointer"
              onClick={() => setIsQuizEnd(true)}
            >
              End Test
            </button>
            <CountdownTimer min={30} onTimeOver={setIsTimeOver} />
          </div>
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
