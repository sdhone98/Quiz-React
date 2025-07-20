import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import CountdownTimer from "../../components/CountdownTimer";
import PopUp from "../../components/PopUp";
import { useSelector } from "react-redux";
import { apiRequest } from "../../utils/api";
import { useToast } from "../../context/ToastContext";

const now = new Date();

const StartQuiz = () => {
  const { state } = useLocation();
  const navigate = useNavigate(null);
  const userData = useSelector((state) => state.user.user);
  const { showToast } = useToast();

  const QuizDetails = {
    quizSetID: state.data.quiz_set_id,
    questions: state.data.questions,
    setType: state.data.set_type,
    topicName: state.data.topic_name,
    topicID: state.data.topic_id,
    time: state.data.total_time,
    difficulty: state.data.difficulty_level,
  }
  
  
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [isQuizEnd, setIsQuizEnd] = useState(false);
  const [isQuizComplte, setIsQuizComplete] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswers((prev) => [...prev, answer]);

    if (questionIndex + 1 < QuizDetails.questions.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const closePopUpFn = () => {
    setIsQuizEnd(false);
  };

  const saveQuizDetails = async () => {
    const reqBody = {
      user_name: userData.userName,
      user_id: userData.userId,
      quiz_user_response: selectedAnswers,
      attempted_questions: selectedAnswers.length,
    };
    console.log("saveQuizDetails ==> ", reqBody);

    const { success, data, error } = await apiRequest({
      url: "http://localhost:8000/api/exam/attempt/submit",
      method: "POST",
      data: reqBody,
    });

    if (success) {
      showToast("Info", "Info", "Store.!!!!!!!");
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

  const quizCompletedFn = () => {
    return (
      <PopUp
        mainMsg={"All Done!"}
        subMsg={
          "Great job! You've reached the end of the quiz. You can now view your results or return to the dashboard."
        }
        btn1Msg={"Submit"}
        btn2Msg={null}
        showCancel={false}
        onCancel={closePopUpFn}
        onConfirm={() => navigate("/student/dashboard")}
      />
    );
  };

  return (
    <>
      {isQuizComplte && quizCompletedFn()}
      {isTimeOver && timeOverFn()}
      {isQuizEnd && quizEndFn()}

      <div className="w-screen h-full py-6 px-10 bg-color-background">
        <div className="w-full mb-4">
          <div className="w-full flex items-center justify-between">
            <h2 className="mb-1 text-4xl tracking-tight font-extrabold text-color-text-1">
              {QuizDetails.topicName}
            </h2>
            <div className="w-fit flex flex-row gap-2">
              <button
                type="button"
                className="py-2 px-4 w-fit text-sm font-medium bg-color-button-1 text-color-text-2 rounded-lg hover:cursor-pointer"
                onClick={() => setIsQuizEnd(true)}
              >
                End Test
              </button>
              <CountdownTimer min={QuizDetails.time} onTimeOver={setIsTimeOver} />
            </div>
          </div>
          <div className="w-fit flex-row justify-center">
            <p className="text-color-text-1 text-sm">Difficaulty Level -{" "}<span className="font-semibold">{QuizDetails.difficulty}</span></p>
            <p className="text-color-text-1 text-sm">Set -{" "}<span className="font-semibold">{QuizDetails.setType}</span></p>
          </div>
        </div>
        <QuizCard
          questionIndex={questionIndex}
          questionData={QuizDetails.questions[questionIndex]}
          onSelect={handleAnswerSelection}
        />
      </div>
    </>
  );
};

export default StartQuiz;
