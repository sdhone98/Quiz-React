import { useState } from "react";

const QuizCard = ({ questionIndex, questionData, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="w-full h-[70%] pt-24">
      <div className="flex flex-col items-center">
        <h2 className="w-1/2 text-3xl font-bold text-color-text mb-6 text-center">
          Q{questionIndex + 1}. {questionData.question_text}
        </h2>
        <div className="w-1/2 flex-row p-4">
          {Object.entries(questionData.options).map(([key, value], index) => (
            <div
              key={key}
              onClick={() => {
                onSelect({
                  questionId: questionData.id,
                  selectedOption: key,
                });
              }}
              className="flex items-center h-14 bg-color-bg-1 text-color-text text-sm mb-2 px-2 py-1 rounded-md cursor-pointer"
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
