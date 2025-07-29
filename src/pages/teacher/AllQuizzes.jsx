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
import CustomBtn from "../../components/CustomBtn";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const AllQuizzes = () => {
  const { showToast } = useToast();
  const topicsList = useSelector((state) => state.topic.topics.data);
  const [selectedTopic, setSelectedTopic] = useState(topicsList[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    ALL_PERPOSE.DIFFICULTY_OBJ_FORMAT_TYPES[0]
  );
  const [quizList, setQuizlist] = useState([]);

  useEffect(() => {
    getQuestionsData();
  }, []);

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
  const NoDataFoundComponet = () => (
    <div className="flex w-full h-1/2  justify-center items-center">
      No Data Found.!
    </div>
  );

  const getColorClass = (difficulty_type) => {
    if (difficulty_type === "Hard")
      return "bg-color-accent-red text-color-text-dark";
    if (difficulty_type === "Medium")
      return "bg-color-accent-yellow text-color-text-dark";
    if (difficulty_type === "Easy")
      return "bg-color-accent-green text-color-text-dark";
    return "bg-color-accent-blue text-color-text-dark";
  };

  return (
    <section className="max-w-screen w-screen h-full bg-color-bg items-center text-color-text">
      <div className="flex flex-col mx-48 h-full">
        <div className="flex justify-between items-center mt-12 mb-8">
          <h1 className="text-3xl font-extrabold text-color-text block select-none pointer-events-none mb-8">
            All Quizzes Set
          </h1>
          <div className="flex gap-2 h-fit">
            <DropDown
              label={selectedTopic.name}
              onSelect={setSelectedTopic}
              optionsList={topicsList}
              isDisable={false}
            />
            <DropDown
              label={selectedDifficulty.name}
              onSelect={setSelectedDifficulty}
              optionsList={ALL_PERPOSE.DIFFICULTY_OBJ_FORMAT_TYPES}
              isDisable={false}
            />
            <CustomBtn label={"Search"} onBtnClick={() => getQuestionsData()} />
          </div>
        </div>
        <div className="flex gap-2 w-full flex-wrap">
          {quizList.length == 0 ? (
            <NoDataFoundComponet />
          ) : (
            quizList.map((ele) => (
              <div className="relative w-90 h-60 bg-color-bg-1 rounded-xl shadow-lg overflow-hidden">
                <div className="w-full h-[40%] absolute top-5 text-color-text text-center text-8xl font-bold flex items-center justify-center select-none pointer-events-none opacity-15">
                  {ele.topic_name}
                </div>
                <div className="h-[60%] w-full absolute bottom-0 bg-color-bg-2 px-4 py-2 flex flex-col justify-center gap-2">
                  <div className="flex justify-between items-center">
                    <h5 className="text-2xl font-semibold text-color-text select-none pointer-events-none mb-2">
                      {ele.topic_name}
                    </h5>
                    <div className="flex gap-1">
                      <label
                        className={
                          "bg-color-bg px-3 h-fit w-fit rounded text-center font-semibold select-none pointer-events-none"
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
                  <div>
                    <p className="text-sm text-color-text select-none pointer-events-none">
                      Time :{" "}
                      <span className="font-semibold">
                        {ele.total_time + " "}Mins.
                      </span>
                    </p>
                    <p className="text-sm text-color-text select-none pointer-events-none">
                      Questions Count :{" "}
                      <span className="font-semibold">
                        {ele.questions_count}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default AllQuizzes;
