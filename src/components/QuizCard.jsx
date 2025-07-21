import { useState } from "react";

const QuizCard = ({ questionIndex, questionData, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="w-2/3 pt-8">
      <h2 className="text-3xl font-bold dark:text-white mb-6">
        Q{questionIndex + 1}. {questionData.question_text}
      </h2>
      <div className="w-2/3 flex-row mb-4">
        {Object.entries(questionData.options).map(([key, value], index) => (
          <div key={key} className="flex items-center w-full p-1 pb-2">
            <input
              type="radio"
              className="w-4 h-4"
              name={`options-radio-${questionIndex}`}
              value={key}
              checked={selectedOption === key}
              onChange={() => setSelectedOption(key)}
            />
            <a
            onClick={()=> setSelectedOption(key)} 
            className="max-w-full text-color-text-1 hover:cursor-pointer box-border text-left rounded-2xl text-md pl-4 ">
              {value}
            </a>
          </div>
        ))}
      </div>
      <button
        disabled={!selectedOption}
        onClick={() => {
          onSelect({
            questionId: questionData.id,
            selectedOption: selectedOption,
          });
          setSelectedOption(null);
        }}
        className={`${
          selectedOption ? "cursor-pointer" : "cursor-not-allowed"
        } px-4 py-2 bg-color-button-1 text-sm font-semibold text-color-text-2 rounded-lg`}
      >
        Submit
      </button>
    </div>
  );
};

export default QuizCard;
