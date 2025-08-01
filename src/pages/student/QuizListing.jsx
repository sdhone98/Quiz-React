import React, { useEffect, useState } from "react";
import DropDown from "../../components/DropDown";
import { ALL_PERPOSE } from "../../constants/allPurpose";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";
import { useSelector } from "react-redux";
import { apiRequest } from "../../utils/api";
import CustomBtn from "../../components/CustomBtn";
import { ROUTES } from "../../constants/routes";
const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const now = new Date();

function QuizListing() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const topicsList = useSelector((state) => state.topic.topics.data);
  const userData = useSelector((state) => state.user.user);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [quizList, setQuizlist] = useState([]);

  useEffect(() => {
    getQuizSetsData();
  }, []);

  const NoDataFoundComponet = () => (
    <div className="flex w-full h-full justify-center items-center text-color-text">
      No Data Found.!
    </div>
  );

  const getQuizSetsData = async () => {
    const payload = {
      detail: true,
      user: userData.userId,
    };

    if (selectedTopic !== null) {
      payload.topic = selectedTopic.id;
    }

    if (selectedDifficulty !== null) {
      payload.difficulty = selectedDifficulty.name;
    }

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_QUIZSETS,
      method: "GET",
      params: payload,
    });

    if (success) {
      if (data.length == 0) {
        showToast("Warning", "Warning", "Quiz not avilable.!");
      }
      setQuizlist(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const getColorClass = (difficulty_type) => {
    if (difficulty_type === "Hard")
      return "bg-red-400 text-color-text dark:text-color-text-dark";
    if (difficulty_type === "Medium")
      return "bg-yellow-400 text-color-text dark:text-color-text-dark";
    if (difficulty_type === "Easy")
      return "bg-green-400 text-color-text dark:text-color-text-dark";
    return "bg-green-400 text-color-text dark:text-color-text-dark";
  };

  const checkUserAllowedOrNot = async (ele) => {
    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.START_QUIZ,
      method: "POST",
      data: {
        user: userData.userId,
        quiz_set: ele.quiz_set_id,
        start_at: now.toUTCString(),
      },
    });

    if (success) {
      ele["quiz_attempt_id"] = data.id;
      navigate(ROUTES.STUDENT_START_QUIZ, {
        state: {
          data: ele,
        },
      });
    } else {
      showToast("Warning", "Warning", JSON.stringify(error.data));
    }
  };

  return (
    <section className="max-w-screen h-full flex-col bg-color-bg py-8 px-20 ">
      <div className="flex justify-between items-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-color-text">
          Start Quiz
        </h1>
        <div className="flex gap-2 h-fit">
          <DropDown
            label={"Topic"}
            onSelect={setSelectedTopic}
            optionsList={topicsList}
            isDisable={false}
          />
          <DropDown
            label={"Difficulty"}
            onSelect={setSelectedDifficulty}
            optionsList={ALL_PERPOSE.DIFFICULTY_OBJ_FORMAT_TYPES}
            isDisable={false}
          />
          <CustomBtn
          label={"Search"}
          onBtnClick={() => getQuizSetsData()}
          />
        </div>
      </div>
      <div className="flex gap-2 w-full flex-wrap f-full">
        {quizList.length == 0 ? (
          <NoDataFoundComponet />
        ) : (
          quizList.map((ele) => (
            <div
              key={ele.quiz_set_id}
              className="relative w-90 h-60 bg-[#1E1E1E] rounded-xl shadow-lg overflow-hidden"
            >
              <div className="w-full h-[40%] absolute top-5 text-color-text text-center text-8xl font-bold flex items-center justify-center select-none pointer-events-none opacity-5">
                {ele.topic_name}
              </div>
              <div className="h-[60%] w-full absolute bottom-0 bg-[#2B2B2B] px-4 py-2 flex-col">
                <div className="flex justify-between items-center">
                  <h5 className="text-3xl font-semibold text-color-text select-none pointer-events-none mb-2">
                    {ele.topic_name}
                  </h5>
                  <div className="flex gap-1">
                    <label
                      className={
                        "bg-color-bg-2 px-3 h-fit w-fit rounded text-center font-semibold select-none pointer-events-none"
                      }
                    >
                      {ele.set_type}
                    </label>
                    <label
                      className={`${getColorClass(
                        ele.difficulty_level
                      )} px-3 h-fit w-fit rounded text-center select-none pointer-events-none`}
                    >
                      {ele.difficulty_level}
                    </label>
                  </div>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z"
                    />
                  </svg>
                  <p className="text-sm text-color-text select-none pointer-events-none">
                    {ele.total_time + " "}Mins.
                  </p>
                </div>
                <p className="text-sm text-color-text select-none pointer-events-none mb-2">
                  Questions Count :{" "}
                  <span className="font-semibold">{ele.questions_count}</span>
                </p>
                <CustomBtn
                label={"Start"}
                 onBtnClick={() => checkUserAllowedOrNot(ele)}

                />
              </div>
              {ele.is_completed && (
                <div className="absolute w-full h-full text-6xl flex justify-center items-center pb-8 font-semibold text-color-text backdrop-blur-xl select-none pointer-events-none">
                  Completed
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default QuizListing;
