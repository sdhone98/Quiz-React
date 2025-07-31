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
import CustomBtn from "../../components/CustomBtn";

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
  const [questionList, setQuestionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(1);

  useEffect(() => {
    if (questionList.length === 0) {
      setQuestionIndex(1);
    }
  }, [questionList]);

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
      questionCounter: questionIndex,
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
    e.target.reset();
    setSelectedOption(null);
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
        difficulty_level: selectedDifficulty.name,
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
    setQuestionIndex((prev) => prev + 1);
  };

  const handleQuestionRemove = (element) => {
    setQuestionList((prev) => prev.filter((item) => item.id !== element.id));
  };

  return (
    <section className="max-w-screen w-screen h-full bg-color-bg items-center text-color-text">
      <div className="flex flex-col mx-48 h-full">
        <div className="flex items-center justify-between mt-12 mb-8">
          <h1 className="mb-2 text-3xl font-extrabold text-color-text block">
            Add Questions
          </h1>
          <CustomBtn label={"Save Questions"} onBtnClick={() => saveQuiz()} />
        </div>
        {isTopicAddOn && <NewTopicAddPopUp onClose={setIsTopicAdd} />}
        <div className="flex h-[80vh] gap-4">
          <div className="w-[40%] h-fit">
            <div className="bg-color-bg-1 p-4 rounded-xl">
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
                <CustomBtn
                  label={"Add Topics"}
                  onBtnClick={() => setIsTopicAdd(true)}
                />
              </div>
              <form
                className="w-full overflow-x-hidden overflow-y-auto md:h-full"
                onSubmit={saveQuestionDetails}
              >
                <div className="rounded-lg shadow">
                  <div className="grid grid-cols-10 items-center justify-between px-6 py-4 rounded-t">
                    <h3 className="col-span-1 text-2xl font-semibold text-color-text text-center p-2">
                      {questionList.length === 0
                        ? "Q."
                        : `${questionList.length}.`}
                    </h3>
                    <input
                      type="text"
                      name="question"
                      id="question"
                      className="col-span-9 bg-color-bg-2 text-color-text text-xl font-normal rounded-lg block w-full p-2.5 placeholder-color-text-light"
                      placeholder="Question"
                      required
                    />
                  </div>

                  <div className="flex-col gap-2 px-6">
                    {optionsLits.map((label, index) => (
                      <div key={label} className="grid grid-cols-10">
                        <span
                          onClick={() => setSelectedOption(label)}
                          className={`${
                            selectedOption === label
                              ? "bg-color-btn"
                              : "bg-white"
                          } col-span-1 self-center justify-self-center w-3 h-3 rounded-4xl cursor-pointer`}
                        ></span>
                        <div className="col-span-9 pb-2">
                          <input
                            type="text"
                            name={`option-${label}`}
                            id={`option-${label}`}
                            className="w-full bg-color-bg-2 text-color-text text-sm rounded-lg block p-2.5 placeholder-color-text-light"
                            placeholder={`Option ${label}`}
                            onFocus={() => setSelectedOption(label)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full px-6 py-4 flex justify-between items-center">
                    <div>
                      <p className="w-fit rounded-md text-sm text-color-text-sub py-2 px-4 bg-color-bg-2">
                        Selected Option -{" "}
                        <span className="font-medium">{selectedOption}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <CustomBtn label={"Add"} />
                      <CustomBtn
                        label={"Reset"}
                        onBtnClick={() => setSelectedOption(null)}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-[60%] bg-color-bg-1 rounded-xl h-75vh p-2">
            {questionList.length <= 0 ? (
              <div className="h-full flex justify-center items-center text-3xl font-semibold opacity-25">
                Empty
              </div>
            ) : (
              <QuestionCard
                questionsData={questionList}
                removeQuestion={handleQuestionRemove}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddQuestions;
