import React, { useState } from "react";
import ResultTable from "../../components/ResultTable";
import DropDown from "../../components/DropDown";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setQuizData } from "../../redux/quizSlice";
import { useDispatch } from "react-redux";
import { apiRequest } from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import {
  setSelectedTopic,
  setSelectedDifficulty,
  setSelectedSet,
} from "../../redux/topicSlice";

const today = new Date();

const StudentDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const user = useSelector((state) => state.user.user);
  const topicsList = useSelector((state) => state.topic.topics.data);
  const difficultiesList = useSelector(
    (state) => state.topic.difficulties.data
  );
  const setList = useSelector((state) => state.topic.quizSetsTypes.data);
  const [selectedTopic, setSelectTopic] = useState(null);
  const [selectDifficulty, setSelectDifficulty] = useState(null);
  const [selectSet, setSelectSet] = useState(null);

  const msgLine1 = "Ready to challenge yourself and grow your skills?";
  const msgLine2 = "Pick a topic and show us what you've got!";

  const sendQuizStartDetails = async (quiz_set) => {
    const reqBody = {
      user_name: user.userName,
      user: user.userId,
      quiz_set: quiz_set,
      start_at: today.toISOString(),
    };

    const { success, data, error } = await apiRequest({
      url: "http://localhost:8000/api/exam/attempt/start",
      method: "POST",
      data: reqBody,
    });

    if (success) {
      showToast("Info", "Info", "Quiz Started.!");
      return true;
    } else {
      showToast("Error", "Error", JSON.stringify(error?.data || error));
      return false;
    }
  };

  const loadQuizQuestionBySelection = async () => {
    if (!selectedTopic) {
      return showToast("Warning", "Warning", "Please select Topic.!");
    }
    if (!selectDifficulty) {
      return showToast("Warning", "Warning", "Please select Difficulty.!");
    }
    if (!selectSet) {
      return showToast("Warning", "Warning", "Please select Set Type.!");
    }

    const { success, data, error } = await apiRequest({
      url: "http://localhost:8000/api/exam/quiz-set",
      method: "POST",
      data: {
        topic: selectedTopic.id,
        difficulty: selectDifficulty.name,
        set_type: selectSet.name,
      },
    });

    if (success) {
      console.log("HERE 1");
      const started = await sendQuizStartDetails(data.quiz_set_id);
      if (!started) return;
      console.log("HERE 2", data.quiz_set_id, data);
      dispatch(setQuizData({ data }));
      dispatch(setSelectedTopic({ ...selectedTopic }));
      dispatch(setSelectedDifficulty({ ...selectDifficulty }));
      dispatch(setSelectedSet({ ...selectSet }));
      navigate("/student/quiz/start");
    } else {
      return showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  return (
    <section className="max-w-screen h-full flex justify-center items-center bg-color-background">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Welcome, {user.name}
          </h1>
          <p className="max-w-2xl font-light text-color-text-1 md:text-lg lg:text-xl">
            {msgLine1}
          </p>
          <p className="max-w-2xl mb-6 font-light text-color-text-1 lg:mb-8 md:text-lg lg:text-xl">
            {msgLine2}
          </p>
          <p className="max-w-2xl mb-6 font-light text-color-text-1 lg:mb-8 md:text-lg lg:text-xl">
            {formattedDate}
          </p>
          <div className="w-full f-hull flex items-center justify-between">
            <div className="flex justify-center items-center gap-2">
              <DropDown
                label={"Topic"}
                onSelect={setSelectTopic}
                optionsList={topicsList}
                isDisable={false}
              />
              <DropDown
                label={"Difficulty"}
                onSelect={setSelectDifficulty}
                optionsList={difficultiesList}
                isDisable={!selectedTopic}
              />
              <DropDown
                label={"Set"}
                onSelect={setSelectSet}
                optionsList={setList}
                isDisable={!Boolean(selectedTopic && selectDifficulty)}
              />
            </div>
            <a
              onClick={() => {
                loadQuizQuestionBySelection();
                console.log(
                  "CHOICE ===> ",
                  selectedTopic,
                  selectDifficulty,
                  selectSet
                );
              }}
              className={`${
                !Boolean(selectedTopic && selectDifficulty && setSelectSet)
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              } w-2/6 inline-flex items-center justify-center px-5 py-3  text-base font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
            >
              {Boolean(selectedTopic) && Boolean(selectDifficulty)
                ? "Start Quiz"
                : "Select Options"}
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <ResultTable />
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
