import React, { useEffect, useState } from "react";
import AddQuestionCard from "../../components/AddQuestionCard";
import QuestionCard from "../../components/QuestionCard";
import NewTopicAddPopUp from "../../components/NewTopicAddPopUp";
import { useSelector } from "react-redux";
import { ALL_PERPOSE } from "../../constants/allPurpose";
import { useToast } from "../../context/ToastContext";
import { apiRequest } from "../../utils/api";
import { useDispatch } from "react-redux";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";
import { setTopics } from "../../redux/topicSlice";
import DropDown from "../../components/DropDown";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const CreateQuiz = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isTopicAddOn, setIsTopicAdd] = useState(false);
  const user = useSelector((state) => state.topic.topics.data);
  const [topicList, setTopicList] = useState(user);
  const [quizName, setQuizName] = useState("");
  const [quizTime, setQuizTime] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);


  useEffect(() => {
    const loadLanguages = async () => {
      const { success, data, error } = await apiRequest({
        url: BASE_URL + API_END_POINTS.GET_TOPIC,
        method: "GET",
      });

      if (success) {
        dispatch(setTopics({ data }));
        setTopicList(data);
      } else {
        showToast("Error", "Error", JSON.stringify(error.data));
      }
    };

    loadLanguages();
  }, [isTopicAddOn]);

  const saveQuiz = () => {
    console.log("------------------- DATA ----------------");
    
    if (quizName.trim().length === 0)
      return showToast("Warning", "Warning", "Quiz name cannot be empty");
    if (selectedTopic === null)
      return showToast("Warning", "Warning", "Quiz Topic requried.!");
    if (selectedDifficulty === null)
      return showToast("Warning", "Warning", "Quiz Difficulty type requried.!");
    if (quizTime === null)
      return showToast("Warning", "Warning", "Quiz time requried.!");
    if (quizTime <= 0)
      return showToast(
    "Warning",
    "Warning",
    "Quiz time should be more than 0 mins.!"
  );
  console.log("==> ", {
    quiz_name: quizName,
    topic: selectedTopic.id,
    difficulty: selectedDifficulty,
    quiz_time: quizTime,
  });
};

const handleQuestionDetailsSelection = (answer) => {
  setQuestionList((prev) => [...prev, answer]);
};

const handleQuestionRemove = (element) => {
  setQuestionList((prev) => prev.filter((item) => item.id !== element.id));
};


return (
  <section className="max-w-screen h-full grid grid-cols-1 grid-rows-13 bg-color-background py-8 px-20">
      {isTopicAddOn && <NewTopicAddPopUp onClose={setIsTopicAdd} />}
      <div className="row-span-1">
        {" "}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-color-text-1">
          Create New Quiz
        </h1>
      </div>
      <div className="row-span-6">
        <div className="grid grid-cols-2">
          <div className="col-span-1 p-4">
            <div className="bg-color-button-3 p-4 rounded-xl">
              <div className="grid gap-4 mb-4 grid-cols-10 sm:gap-6 sm:mb-5">
                <label
                  htmlFor="quizName"
                  className="block mb-2 text-sm font-medium text-color-text-1 sm:col-span-2 self-center"
                >
                  Quiz Title:
                </label>
                <input
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value.trim())}
                  type="text"
                  name="quizName"
                  id="quizName"
                  className="sm:col-span-8 bg-color-button-3 text-color-text-1 text-sm rounded-lg  block w-full p-2.5"
                  placeholder="Quiz Name"
                  required
                />
              </div>
              <div className="grid  mb-4 grid-cols-10 sm:mb-5">
                <label
                  htmlFor="difficulty"
                  className="block mb-2 text-sm font-medium text-color-text-1 sm:col-span-2 self-center"
                >
                  Select Topic:
                </label>
                <div className="sm:col-span-6 bg-color-button-3 text-color-text-1 text-sm rounded-lg  w-fit">
                  <button
                    onClick={() => setIsDropDownOpen(true)}
                    class="text-color-text-1 bg-color-button-3 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                  >
                    {selectedTopic ? selectedTopic.name : "Topic"}
                    <svg
                      class="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>

                  <div
                    id="dropdownUsers"
                    class={`${
                      isDropDownOpen ? "" : "hidden"
                    } absolute z-10 bg-[#696969] rounded-lg shadow-sm w-60`}
                  >
                    <ul
                      class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownUsersButton"
                    >
                      {topicList.map(({ name, id }) => (
                        <li key={id}>
                          <a
                            onClick={() => {
                              setSelectedTopic({ name: name, id: id }),
                                setIsDropDownOpen(false);
                            }}
                            class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            {name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => setIsTopicAdd(true)}
                  type="submit"
                  className="sm:col-span-2 text-color-text-2 bg-color-button-1 hover:bg-color-button-3 hover:text-color-text-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Add Topic
                </button>
              </div>
              <div className="grid mb-4 grid-cols-10 sm:mb-5">
                <label
                  htmlFor="difficulty"
                  className="block mb-2 text-sm font-medium text-color-text-1 sm:col-span-2 self-center"
                >
                  Difficulty Level:
                </label>
                <select
                  id="difficulty"
                  className="sm:col-span-8 bg-color-button-3 text-color-text-1 text-sm rounded-lg  block w-fit p-2.5"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value.trim())}
                >
                  {ALL_PERPOSE.DIFFICULTY_TYPES.map((ele) => (
                    <option value={ele}>{ele} </option>
                  ))}
                </select>
              </div>
              <div className="grid mb-4 grid-cols-10 sm:mb-5 pl-2">
                <label
                  htmlFor="time"
                  className="block mb-2 text-sm font-medium text-color-text-1 sm:col-span-2 self-center"
                >
                  Duration (mins):
                </label>
                <input
                  value={quizTime}
                  onChange={(e) => setQuizTime(e.target.value.trim())}
                  type="number"
                  name="time"
                  id="time"
                  className="sm:col-span-8 bg-color-button-3 text-color-text-1 text-sm rounded-lg  block w-full p-2.5"
                  placeholder="Ex. 12"
                  required
                />
              </div>
              <div>
                <div className="grid mb-4 sm:grid-cols-10 sm:mb-5 pl-2">
                  <a
                    onClick={() => saveQuiz()}
                    className={
                      "sm:col-span-3 cursor-pointer inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1"
                    }
                  >
                    Add New Question
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <AddQuestionCard
              onSave={handleQuestionDetailsSelection}
            />
          </div>
        </div>
      </div>

      <div className="row-span-6">
        <QuestionCard optionsList={questionList} removeQuestion={handleQuestionRemove}/>
      </div>
    </section>
  );
};

export default CreateQuiz;
