import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ALL_PERPOSE } from "../../constants/allPurpose";
import { useToast } from "../../context/ToastContext";
import { apiRequest } from "../../utils/api";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const SavePopUp = ({ onClose, onSave }) => {
  const { showToast } = useToast();

  const [quizDetails, setQuizDetails] = useState({
    quizSetType: ALL_PERPOSE.SET_TYPES[0],
    quizTime: null,
  });

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
      <div className="max-w-sm p-6 bg-transparent rounded-lg shadow-sm border">
        <div className="flex justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Quiz Details
          </h5>
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white hover:cursor-pointer"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            onClick={onClose}
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>

        <div className="flex items-center mb-2">
          <label className="w-20 text-sm font-medium text-gray-900 dark:text-white">
            Set Type
          </label>
          <select
            id="difficulty"
            className="bg-color-button-3 text-color-text-1 text-sm rounded-lg w-fit p-2.5"
            onChange={(e) =>
              setQuizDetails((prev) => ({
                ...prev,
                quizSetType: e.target.value ? e.target.value : null,
              }))
            }
          >
            {ALL_PERPOSE.SET_TYPES.map((ele) => (
              <option value={ele}>{ele} </option>
            ))}
          </select>
        </div>
        <div className="flex items-center">
          <label className="w-20 text-sm font-medium text-gray-900 dark:text-white">
            Total Time
          </label>
          <input
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-fit p-2.5"
            placeholder="10"
            required
            onChange={(e) =>
              setQuizDetails((prev) => ({
                ...prev,
                quizTime: e.target.value ? parseInt(e.target.value, 10) : null,
              }))
            }
          />
        </div>
        <a
          onClick={() => {
            if (quizDetails.quizTime == null) {
              return showToast("Warning", "Warning", "Time required.!");
            }
            onSave(quizDetails);
          }}
          className="mt-2 w-24 h-10 p-2 bg-color-accent-1 float-right sm:col-span-2 text-color-text-2hover:bg-color-button-3 hover:text-color-text-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Save
        </a>
      </div>
    </div>
  );
};

const CreateQuiz = () => {
  const { showToast } = useToast();

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    ALL_PERPOSE.DIFFICULTY_TYPES[0]
  );
  const topicsList = useSelector((state) => state.topic.topics.data);
  const [filterQuestions, setFilterQuestions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [createdQuestionSet, setCreatedQuestionSet] = useState([]);
  const [selectedIdsList, setSelectedIdsList] = useState([]);
  const [isPopUpopen, setIsPopUPOpen] = useState(false);

  useEffect(() => {
    if (topicsList.length > 0) {
      setSelectedTopic(topicsList[0].id);
    }
  }, [topicsList]);

  const getQuestionsData = async () => {
    setCreatedQuestionSet([]);
    setSelectedIdsList([]);
    console.log(
      "------------------- SEND DATA -------------------",
      selectedTopic,
      selectedDifficulty
    );
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
      url: BASE_URL + API_END_POINTS.GET_QUESTIONS,
      method: "GET",
      params: {
        topic: selectedTopic,
        difficulty: selectedDifficulty,
      },
    });

    if (success) {
      setFilterQuestions(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const handelPopUpOnSave = (data) => {
    console.log("-------------- ON POPUP SAVE ------------------- ", data);
    saveQuestionSetData(data.quizSetType, data.quizTime);
  };

  const saveQuestionSetData = async (quizSetType, quizTime) => {
    const questionsIds = createdQuestionSet.map((item) => item.id);
    if (selectedTopic === null) {
      return showToast("Warning", "Warning", "Topic details required.!");
    }

    if (selectedDifficulty === null) {
      return showToast("Warning", "Warning", "Difficulty level required.!");
    }
    if (createdQuestionSet.length === 0) {
      return showToast("Warning", "Warning", "Please select Questions first.!");
    }
    const _data = {
      topic: selectedTopic,
      set_type: quizSetType,
      total_time: quizTime,
      difficulty_level: selectedDifficulty,
      questions: questionsIds,
    };

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.ADD_QUIZSETS,
      method: "POST",
      data: _data,
    });

    if (success) {
      showToast("Info", "Info", "Quiz set saved successfully.!");
      setIsPopUPOpen(false)
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const handleAddQuestion = (question) => {
    setCreatedQuestionSet((prev) => {
      const exists = prev.some((item) => item.id === question.id);
      if (exists) {
        showToast(
          "Warning",
          "Warning",
          `Question is ${question.id} already exists.`
        );
        return prev;
      }
      setSelectedIdsList((prev) => [...prev, question.id]);
      return [...prev, question];
    });
  };

  const handleQuestionRemove = (element) => {
    setCreatedQuestionSet((prev) =>
      prev.filter((item) => item.id !== element.id)
    );
    setSelectedIdsList((prev) => prev.filter((item) => item !== element.id));
  };

  return (
    <div className="relative max-w-screen bg-color-background flex-col h-full px-20 py-8 text-color-text-1">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-extrabold text-color-text-1 block">
          Create QuizSet
        </h1>
        <div className="flex h-fit">
          <div className="flex gap-2">
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
      </div>
      <div className="flex w-full max-h-[90%] gap-2">
        <div className="w-1/2 overflow-y-auto scrollbar-hide">
          {filterQuestions.map((ele, index) => (
            <div
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`${
                selectedIdsList.includes(ele.id) && "bg-green-900"
              } border rounded-xl p-2 mb-2`}
            >
              <div className="flex justify-between">
                <p className="max-w-[95%] whitespace-nowrap w-fit text-lg font-bold text-color-text-1 overflow-hidden">
                  {index + 1}. {ele.question_text}
                  <span className="text-2xl font-bold whitespace-nowrap"></span>
                </p>

                {hoveredIndex === index && (
                  <span
                    className="px-2 py-1 bg-color-button-3 text-center rounded-md cursor-pointer"
                    onClick={() => handleAddQuestion(ele)}
                  >
                    Add
                  </span>
                )}
              </div>

              {ele.options_list.map((op, op_index) => (
                <div>
                  <p className="text-md text-color-text-1 overflow-hidden whitespace-nowrap pb-1">
                    {op.op_key}:{" "}
                    <span
                      className={`${
                        op.op_key == ele.correct_option
                          ? "text-green-400"
                          : "text-color-text-1"
                      } text-xl font-no`}
                    >
                      {op.op_value}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-1/2 overflow-y-auto scrollbar-hide">
          {createdQuestionSet.map((ele, index) => (
            <div className="border rounded-xl p-2 mb-2">
              <div className="flex justify-between">
                <p className="max-w-[95%] whitespace-nowrap w-fit text-lg font-bold text-color-text-1 overflow-hidden">
                  {index + 1}. {ele.question_text}
                  <span className="text-2xl font-bold whitespace-nowrap"></span>
                </p>
                <span
                  className="px-2 py-1 bg-color-button-3 text-center rounded-md cursor-pointer"
                  onClick={() => handleQuestionRemove(ele)}
                >
                  Remove
                </span>
              </div>

              {ele.options_list.map((op, op_index) => (
                <div>
                  <p className="text-md text-color-text-1 overflow-hidden whitespace-nowrap pb-1">
                    {op.op_key}:{" "}
                    <span
                      className={`${
                        op.op_key == ele.correct_option
                          ? "text-green-400"
                          : "text-color-text-1"
                      } text-xl font-no`}
                    >
                      {op.op_value}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {filterQuestions.length > 0 && (
        <div className="w-full float-end flex-col">
          <button
            onClick={() => {
              if (createdQuestionSet.length === 0) {
                return showToast(
                  "Warning",
                  "Warning",
                  "Please select Questions first.!"
                );
              }
              setIsPopUPOpen(true);
            }}
            className="w-24 h-10 p-2 bg-color-accent-1 float-right sm:col-span-2 text-color-text-2hover:bg-color-button-3 hover:text-color-text-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Save
          </button>
        </div>
      )}
      {isPopUpopen && (
        <SavePopUp
          onClose={() => setIsPopUPOpen(!isPopUpopen)}
          onSave={handelPopUpOnSave}
        />
      )}
    </div>
  );
};

export default CreateQuiz;
