import { useEffect, useState } from "react";
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

const SavePopUp = ({ onClose, onSave }) => {
  const { showToast } = useToast();

  const [quizDetails, setQuizDetails] = useState({
    quizSetType: null,
    quizTime: null,
  });

  const handelOnClick = (ele) => {
    setQuizDetails((prev) => ({
      ...prev,
      quizSetType: ele.id ? ele.id : null,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-md bg-opacity-50 flex justify-center items-center">
      <div className="max-w-sm p-6 rounded-lg shadow-sm bg-color-bg-1">
        <div className="flex justify-between items-center mb-4">
          <h5 className="mb-2 text-2xl font-semibold select-none text-color-text">
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
          <label className="w-20 text-sm font-normal text-color-text">
            Set Type
          </label>
          <DropDown
            label={"Set Type"}
            onSelect={handelOnClick}
            optionsList={ALL_PERPOSE.SET_TYPES_OBJ_FORMAT}
            isDisable={false}
          />
        </div>
        <div className="flex items-center">
          <label className="w-20 text-sm font-normal text-color-text">
            Total Time
          </label>
          <input
            type="number"
            className="bg-color-bg-1 text-color-text font-semibold text-sm rounded-lg w-fit p-2.5 border-1"
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
          className="mt-4 w-24 h-10 p-2 bg-color-btn float-right text-color-text-dark hover:bg-color-btn-hover hover:text-color-text font-medium rounded-4xl text-sm px-5 py-2.5 text-center cursor-pointer"
        >
          Save
        </a>
      </div>
    </div>
  );
};

const CreateQuiz = () => {
  const { showToast } = useToast();

  const topicsList = useSelector((state) => state.topic.topics.data);
  const [selectedTopic, setSelectedTopic] = useState(topicsList[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    ALL_PERPOSE.DIFFICULTY_OBJ_FORMAT_TYPES[0]
  );
  const [filterQuestions, setFilterQuestions] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [createdQuestionSet, setCreatedQuestionSet] = useState([]);
  const [selectedIdsList, setSelectedIdsList] = useState([]);
  const [isPopUpopen, setIsPopUPOpen] = useState(false);

  useEffect(() => {
    getQuestionsData();
  }, []);

  useEffect(() => {
    if (topicsList.length > 0) {
      setSelectedTopic(topicsList[0].id);
    }
  }, [topicsList]);

  const getQuestionsData = async () => {
    setCreatedQuestionSet([]);
    setSelectedIdsList([]);
    if (selectedTopic === null) {
      return showToast("Warning", "Warning", "Topic details required.!");
    }

    if (selectedDifficulty === null) {
      return showToast("Warning", "Warning", "Difficulty level required.!");
    }

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_QUESTIONS,
      method: "GET",
      params: {
        topic: selectedTopic.id,
        difficulty: selectedDifficulty.name,
      },
    });

    if (success) {
      setFilterQuestions(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const handelPopUpOnSave = (data) => {
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

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.ADD_QUIZSETS,
      method: "POST",
      data: {
        topic: selectedTopic.id,
        set_type: quizSetType,
        total_time: quizTime,
        difficulty_level: selectedDifficulty.id,
        questions: questionsIds,
      },
    });

    if (success) {
      showToast("Info", "Info", "Quiz set saved successfully.!");
      setFilterQuestions([]);
      setCreatedQuestionSet([]);
      setIsPopUPOpen(false);
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
    <div className="relative max-w-screen bg-color-bg flex-col h-full px-20 py-8 text-color-text">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-extrabold text-color-text block">
          Create QuizSet
        </h1>
        <div className="flex h-fit">
          <div className="flex gap-2">
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
      </div>
      <div className="flex w-full h-[85%] gap-2">
        <div className="w-1/2 overflow-y-auto scrollbar-hide">
          {filterQuestions.map((ele, index) => (
            <div
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`${
                selectedIdsList.includes(ele.id)
                  ? "bg-green-900"
                  : "bg-color-bg-1"
              } bg-color-bg-1 rounded-xl px-4 py-2 mb-2`}
            >
              <div className="flex justify-between">
                <p className="max-w-[95%] whitespace-nowrap w-fit text-2xl font-bold text-color-text overflow-hidden">
                  {index + 1}. {ele.question_text}
                </p>

                {hoveredIndex === index && (
                  <span
                    className="h-fit px-3 py-1 bg-color-bg text-center text-sm rounded-md cursor-pointer"
                    onClick={() => handleAddQuestion(ele)}
                  >
                    Add
                  </span>
                )}
              </div>

              {ele.options_list.map((op, op_index) => (
                <div>
                  <p className="text-sm text-color-text overflow-hidden whitespace-nowrap pb-1">
                    {op.op_key}
                    {""}:{" "}
                    <span
                      className={`${
                        op.op_key == ele.correct_option
                          ? "text-green-400"
                          : "text-color-text"
                      } text-sm font-no`}
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
            <div className="bg-color-bg-1 rounded-xl px-4 py-2 mb-2">
              <div className="flex justify-between">
                <p className="w-[95%] whitespace-nowrap text-2xl font-semibold text-color-text overflow-hidden">
                  {index + 1}. {ele.question_text}
                </p>
                <span
                  className="h-fit px-2 py-1 bg-color-bg text-center rounded-md cursor-pointer text-color-text text-sm"
                  onClick={() => handleQuestionRemove(ele)}
                >
                  Remove
                </span>
              </div>

              {ele.options_list.map((op, op_index) => (
                <div>
                  <p className="text-sm text-color-text overflow-hidden whitespace-nowrap pb-1">
                    {op.op_key} :{" "}
                    <span
                      className={`${
                        op.op_key == ele.correct_option
                          ? "text-green-400"
                          : "text-color-text"
                      } text-sm font-no`}
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
        <div className="w-full float-end flex-col pt-2">
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
            className="w-fit p-2 bg-color-btn text-color-text-dark float-right hover:bg-color-btn-hover hover:text-color-text font-semibold rounded-4xl text-sm px-5 py-2.5 text-center hover:cursor-pointer"
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
