import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ALL_PERPOSE } from "../../constants/allPurpose";
import { useToast } from "../../context/ToastContext";
import { apiRequest } from "../../utils/api";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";
import DropDown from "../../components/DropDown";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const AllQuizzes = () => {
  const { showToast } = useToast();
  const topicsList = useSelector((state) => state.topic.topics.data);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [quizList, setQuizlist] = useState([]);

  const getQuestionsData = async () => {
    if (selectedTopic === null) {
      return showToast("Warning", "Warning", "Topic details required.!");
    }

    if (selectedDifficulty === null) {
      return showToast("Warning", "Warning", "Difficulty level required.!");
    }

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_QUIZSETS,
      method: "GET",
      params: {
        detail: true,
        difficulty: selectedDifficulty.name,
        topic: Number(selectedTopic.id),
      },
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
  const NoDataFoundComponet = () => <div className="flex w-full h-full justify-center items-center">No Data Found.!</div>;

  const getColorClass = (difficulty_type) => {
    if (difficulty_type === "Hard")
      return "bg-red-400 text-color-text-1 dark:text-color-text-2";
    if (difficulty_type === "Medium")
      return "bg-yellow-400 text-color-text-1 dark:text-color-text-2";
    if (difficulty_type === "Easy")
      return "bg-green-400 text-color-text-1 dark:text-color-text-2";
    return "bg-green-400 text-color-text-1 dark:text-color-text-2";
  };

  return (
    <div className="w-full h-full bg-color-background text-color-text-1 px-20 py-8 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-extrabold text-color-text-1 block select-none pointer-events-none mb-8">
          All Quizzes
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
          <button
            onClick={() => getQuestionsData()}
            type="submit"
            className="sm:col-span-2 text-color-text-2 bg-color-button-1 hover:bg-color-button-3 hover:text-color-text-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex gap-2 w-full flex-wrap f-full">
        {quizList.length == 0
          ? <NoDataFoundComponet/>
          : quizList.map((ele) => (
              <div className="relative w-90 h-60 bg-[#1E1E1E] rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-[45%] absolute top-5  text-center text-8xl font-bold flex items-center justify-center select-none pointer-events-none opacity-10">
                  {ele.topic_name}
                </div>
                <div className="h-[55%] w-full absolute bottom-0 bg-[#2B2B2B] px-4 py-2 flex-col">
                  <div className="flex justify-between items-center">
                    <h5 class="text-3xl font-semibold text-color-text-1 select-none pointer-events-none mb-2">
                      {ele.topic_name}
                    </h5>
                    <div className="flex gap-1">
                      <label
                        className={
                          "bg-color-button-3 px-3 h-fit w-fit rounded text-center font-semibold select-none pointer-events-none"
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
                  <p class="text-sm text-color-text-1 select-none pointer-events-none">
                    Time :{" "}
                    <span className="font-semibold">
                      {ele.total_time + " "}Mins.
                    </span>
                  </p>
                  <p class="text-sm text-color-text-1 select-none pointer-events-none">
                    Questions Count :{" "}
                    <span className="font-semibold">{ele.questions_count}</span>
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default AllQuizzes;
