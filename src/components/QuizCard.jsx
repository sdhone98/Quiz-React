import { useState } from "react";

const QuizCard = ({ questionIndex, questionData, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (key) => {
    setSelectedOption(key);

    setTimeout(() => {
      onSelect({
        questionId: questionData.id,
        selectedOption: key,
      });
    }, 200);
  };

  return (
    <div className="w-full h-[70%] pt-24">
      <div className="flex flex-col items-center">
        <h2 className="w-1/2 text-3xl font-bold text-color-text mb-6 text-center">
          {questionData.question_text}
        </h2>
        <div className="w-1/2 flex-row px-6 py-4">
          {Object.entries(questionData.options).map(([key, value], index) => (
            <div
              key={key}
              onClick={() => handleOptionClick(key)}
              className={`flex items-center p-4 bg-color-bg-1 text-color-text text-sm mb-2 rounded-md cursor-pointer 
                hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out`}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
