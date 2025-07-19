import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ALL_PERPOSE } from "../../constants/allPurpose";
import { useToast } from "../../context/ToastContext";
import { apiRequest } from "../../utils/api";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const AllQuizzes = () => {
  const { showToast } = useToast();

  const topicsList = useSelector((state) => state.topic.topics.data);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    ALL_PERPOSE.DIFFICULTY_TYPES[0]
  );
  const [quizList, setQuizlist] = useState([]);

  useEffect(() => {
    if (topicsList.length > 0) {
      setSelectedTopic(topicsList[0].id);
    }
  }, [topicsList]);

  const getQuestionsData = async () => {
    if (selectedTopic === null) {
      return showToast("Warning", "Warning", "Topic details required.!");
    }

    if (selectedDifficulty === null) {
      return showToast("Warning", "Warning", "Difficulty level required.!");
    }

    const _data = {
      topic: selectedTopic,
      difficulty: selectedDifficulty,
    };

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_QUIZSETS,
      method: "GET",
      params: {
        detail: true,
        difficulty: selectedDifficulty,
        topic: Number(selectedTopic),
      },
    });

    if (success) {
      setQuizlist(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  return (
    <div className="w-full h-full bg-color-background text-color-text-1 px-20 py-8 flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-extrabold text-color-text-1 block">
          All Quizzes
        </h1>
        <div className="flex gap-2 h-fit">
          <select
            id="difficulty"
            className="bg-color-button-3 text-color-text-1 text-sm rounded-lg w-fit p-2.5"
            onChange={(e) => setSelectedTopic(e.target.value.trim())}
          >
            {topicsList.map((ele) => (
              <option key={ele.id} value={ele.id}>
                {ele.name}
              </option>
            ))}
          </select>
          <select
            id="difficulty"
            className="bg-color-button-3 text-color-text-1 text-sm rounded-lg w-fit p-2.5"
            value={selectedDifficulty ? selectedDifficulty : "Select Topic"}
            onChange={(e) => setSelectedDifficulty(e.target.value.trim())}
          >
            {ALL_PERPOSE.DIFFICULTY_TYPES.map((ele) => (
              <option value={ele}>{ele} </option>
            ))}
          </select>
          <button
            onClick={() => getQuestionsData()}
            type="submit"
            className="sm:col-span-2 text-color-text-2 bg-color-button-1 hover:bg-color-button-3 hover:text-color-text-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex gap-2">
        {quizList.map((ele) => (
          <div className="flex-col">
            <a
              class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {ele.topic_name}
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                Difficulty : {ele.difficulty_level}
              </p>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                Set Type : {ele.set_type}
              </p>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                Time : {ele.total_time} Mins.
              </p>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                Questions Count : {ele.questions_count}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllQuizzes;
