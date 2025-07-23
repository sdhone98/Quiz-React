import { useEffect, useState } from "react";
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
import { setDifficulties, setTopics } from "../../redux/topicSlice";
import { v4 as uuidv4 } from "uuid";
import DropDown from "../../components/DropDown";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;
const optionsLits = ["A", "B", "C", "D"];

const AddQuestions = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [isTopicAddOn, setIsTopicAdd] = useState(false);
  const topicData = useSelector((state) => state.topic.topics.data);
  const [topicList, setTopicList] = useState(topicData);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

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

  const saveQuestionDetails = (e) => {
    e.preventDefault();
    // VALIDATION FOR PREV OPTIONS VALUS AVAILABE OR NOT
    optionsLits
      .slice(0, 1 + optionsLits.indexOf(selectedOption))
      .map(
        (ele) =>
          e.target[`option-${ele}`].value.trim().length === 0 &&
          showToast("Warning", "Warning", `Option ${ele} value is missing.!`)
      );

    const selectedOpValue = e.target[`option-${selectedOption}`].value.trim();
    if (!selectedOpValue || selectedOpValue.length === 0) {
      return showToast(
        "Warning",
        "Warning",
        `Option ${selectedOption} value is missing.!`
      );
    }

    const q_data = {
      id: uuidv4(),
      question: e.target.question.value,
      op_a: e.target["option-A"].value,
      op_b: e.target["option-B"].value,
      op_c: e.target["option-C"].value,
      op_d: e.target["option-D"].value,
      correct_op: selectedOption,
      optionsList: [
        { op_key: "A", op_value: e.target["option-A"].value },
        { op_key: "B", op_value: e.target["option-B"].value },
        { op_key: "C", op_value: e.target["option-C"].value },
        { op_key: "D", op_value: e.target["option-D"].value },
      ],
    };
    handleQuestionDetailsSelection(q_data);
    // e.target.reset();
    // setSelectedOption(null);
  };

  const saveQuiz = async () => {
    if (selectedTopic === null)
      return showToast("Warning", "Warning", "Quiz Topic requried.!");
    if (selectedDifficulty === null)
      return showToast("Warning", "Warning", "Quiz Difficulty type requried.!");

    const finalData = [];

    questionList.forEach(function (ele) {
      finalData.push({
        question_text: ele.question,
        option_a: ele.op_a,
        option_b: ele.op_b,
        option_c: ele.op_c,
        option_d: ele.op_d,
        correct_option: ele.correct_op,
        topic: selectedTopic.id,
        difficulty_level: selectedDifficulty,
      });
    });

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.ADD_QUESTIONS,
      method: "POST",
      data: finalData,
    });

    if (success) {
      showToast("Info", "Info", "Quiz Store Completely.");

      setSelectedTopic(null);
      setSelectedDifficulty(null);
      setQuestionList([]);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const handleQuestionDetailsSelection = (answer) => {
    setQuestionList((prev) => [...prev, answer]);
  };

  const handleQuestionRemove = (element) => {
    setQuestionList((prev) => prev.filter((item) => item.id !== element.id));
  };

  return (
    <section className="max-w-screen bg-color-background flex-col h-full px-20 py-8">
      {isTopicAddOn && <NewTopicAddPopUp onClose={setIsTopicAdd} />}
      <div className="row-span-1 flex items-center justify-between">
        {" "}
        <h1 className="mb-2 text-5xl font-extrabold text-color-text-1 block">
          Add Questions
        </h1>
        <div className="">
          <a
            onClick={() => saveQuiz()}
            className={
              "cursor-pointer inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1"
            }
          >
            Save Questions
          </a>
        </div>
      </div>

      <div className="flex h-[80vh] gap-2">
        <div className="w-1/2 h-fit">
          <div className="bg-color-button-3 p-4 rounded-xl mb-4">
            <div className="w-full flex justify-between items-center mb-4 px-1">
              <div className="flex gap-2">
                <DropDown
                  label={"Topic"}
                  onSelect={setSelectedTopic}
                  optionsList={topicList}
                  isDisable={false}
                />

                <DropDown
                  label={"Difficulty"}
                  onSelect={setSelectedDifficulty}
                  optionsList={ALL_PERPOSE.DIFFICULTY_OBJ_FORMAT_TYPES}
                  isDisable={false}
                />
              </div>
              <span
                onClick={() => setIsTopicAdd(true)}
                className="h-fit text-color-text-2 cursor-pointer hover:underline font-medium rounded-lg text-sm text-center"
              >
                Add Topics
              </span>
            </div>
            <form
              className="w-full overflow-x-hidden overflow-y-auto md:h-full"
              onSubmit={saveQuestionDetails}
            >
              <div className="border border-white rounded-lg shadow">
                <div className="grid grid-cols-10 items-center justify-between px-6 py-4 rounded-t">
                  <h3 className="col-span-1 text-lg font-bold text-color-text-1 text-center p-2">
                    Q
                  </h3>
                  <input
                    type="text"
                    name="question"
                    id="question"
                    className="col-span-9 bg-color-button-3 text-color-text-1 text-lg font-bold rounded-lg block w-full p-2.5"
                    placeholder="Question"
                    required
                  />
                </div>

                <div className="flex-col gap-2 px-6">
                  {optionsLits.map((label, index) => (
                    <div key={label} className="grid grid-cols-10">
                      <span className="col-span-1 flex justify-center items-center">
                        <input
                          id={label}
                          type="radio"
                          name="correctAnswer"
                          value={label}
                          className="w-4 h-3 text-color-text-1 rounded-4xl hover:cursor-pointer"
                          onChange={() => setSelectedOption(label)}
                          checked={selectedOption === label}
                        />
                      </span>
                      <div className="col-span-9 pb-2">
                        <input
                          type="text"
                          name={`option-${label}`}
                          id={`option-${label}`}
                          className="w-full bg-color-button-3 text-color-text-1 text-sm rounded-lg block p-2.5"
                          placeholder={`Option ${label}`}
                          onFocus={() => setSelectedOption(label)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="w-fit h-fit rounded-md text-md text-color-text-2 py-1 px-3 bg-color-button-3">
                      Selected Option:{" "}
                      <span className="font-medium">
                        {selectedOption || "-"}
                      </span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="text-color-text-2 bg-color-button-1 hover:bg-color-button-3 hover:text-color-text-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Add
                    </button>
                    <button
                      type="reset"
                      className="text-color-text-2 bg-color-button-3 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => setSelectedOption(null)}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/2 bg-color-button-3 rounded-xl h-full p-2">
                <QuestionCard
          questionsData={questionList}
          removeQuestion={handleQuestionRemove}
        />
        </div>
      </div>
    </section>
  );
};

export default AddQuestions;
