import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import CountdownTimer from "../../components/CountdownTimer";
import PopUp from "../../components/PopUp";
import { useSelector } from "react-redux";
import { apiRequest } from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";
import DropDown from "../../components/DropDown";
import CustomBtn from "../../components/CustomBtn";
import { useLoading } from "../../context/LoadingContext";
import ResultSummery from "../../components/ResultSummery";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const now = new Date();

const StartQuiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate(null);
  const userData = useSelector((state) => state.user.user);
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();

  const QuizDetails = {
    quizSetID: state.data.quiz_set_id,
    quizAttemptID: state.data.quiz_attempt_id,
    questions: state.data.questions,
    setType: state.data.set_type,
    topicName: state.data.topic_name,
    topicID: state.data.topic_id,
    time: state.data.total_time,
    difficulty: state.data.difficulty_level,
  };

  const [questionIndex, setQuestionIndex] = useState(0);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [isQuizComplte, setIsQuizComplete] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const progress = ((questionIndex + 1) / QuizDetails.questions.length) * 100;

  useEffect(() => {
    if (isQuizComplte) {
      setIsLoading(true);
      setTimeout(() => {
        getUserQuizRepostData().finally(() => setIsLoading(false));
        setIsLoading(false);
      }, 2000);
    }
  }, [isQuizComplte]);

  const handleAnswerSelection = (answer) => {
    selectedAnswers.push({
      questionId: answer.questionId,
      selectedOption: answer.selectedOption.split("_")[1].toUpperCase(),
    });
    updateQuestion();
  };

  function updateQuestion() {
    if (questionIndex + 1 < QuizDetails.questions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
      saveQuizDetails();
    }
  }

  const closePopUpFn = () => {
    setIsQuizEnd(false);
  };

  const saveQuizDetails = async () => {
    const reqBody = {
      user: userData.userId,
      attempt: QuizDetails.quizAttemptID,
      quiz_user_response: selectedAnswers,
    };

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.ADD_QUIZ_RESPONSE,
      method: "POST",
      data: reqBody,
    });

    if (success) {
      showToast("Info", "Info", "Quiz response store successfully.");
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const timeOverFn = () => {
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
  };

  const quizEndFn = () => {
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
        onConfirm={() => {
          saveQuizDetails();
          navigate("/student/dashboard");
        }}
      />
    );
  };

  const getUserQuizRepostData = async () => {
    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_QUIZ_RESULT_REPORT,
      method: "GET",
      params: { attempt: QuizDetails.quizAttemptID },
    });

    if (success) {
      setResultData(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const quizCompletedFn = () => {
    setIsLoading(true);

    setTimeout(() => {
      getUserQuizRepostData();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      {isTimeOver && timeOverFn()}
      {isQuizEnd && quizEndFn()}

      {resultData ? (
        <ResultSummery
          totalQuestions={resultData.totalQuestions}
          correctAnswers={resultData.correctAnswers}
          incorrectAnswers={resultData.incorrectAnswers}
          percentage={resultData.percentage}
        />
      ) : (
        <div className="w-screen h-full py-6 px-10 bg-color-bg">
          <div className="w-full flex justify-between">
            <CountdownTimer min={QuizDetails.time} onTimeOver={setIsTimeOver} />
            <CustomBtn
              label={"End Test"}
              onBtnClick={() => setIsQuizEnd(true)}
            />
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-1/3 flex justify-between items-center px-2 mb-1">
              <p className="text-color-text text-sm font-normal">
                Question {questionIndex + 1} of {QuizDetails.questions.length}
              </p>
              <p className="text-color-text text-sm font-normal">
                {progress.toFixed(0)}% Complete
              </p>
            </div>

            <div className="w-1/3 bg-color-bg-2 rounded-full px-1.5 py-1">
              <div
                className="bg-color-btn text-xs font-bold text-color-text-dark text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
              >
                {progress.toFixed(0)}%
              </div>
            </div>
          </div>

          <QuizCard
            questionIndex={questionIndex}
            questionData={QuizDetails.questions[questionIndex]}
            onSelect={handleAnswerSelection}
          />
        </div>
      )}
    </>
  );
};

export default StartQuiz;
