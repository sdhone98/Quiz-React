import { useState } from "react";

const QuestionCard = ({ questionsData, removeQuestion }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="overflow-y-auto scrollbar-hide h-full px-2 flex-col w-full gap-2 pt-8">
      {questionsData.map((ele, index) => (
        <div
        key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="bg-color-bg-2 rounded-lg p-4 mb-2"
        >
          <div className="flex justify-between items-center text-color-text">
            <p className="max-w-[95%] whitespace-nowrap w-fit text-2xl font-bold text-color-text overflow-hidden select-none">
              {ele.questionCounter}{". "}
              <span className="text-2xl font-semibold whitespace-nowrap select-none">
                {ele.question}
              </span>
            </p>

            {true && (
              <span
                className="h-fit px-3 py-1 bg-color-bg text-center rounded-md cursor-pointer text-sm"
                onClick={() => removeQuestion(ele)}
              >
                Discard
              </span>
            )}
          </div>
          {ele.optionsList.map((op) => (
            <div>
              <p className="text-sm text-color-text overflow-hidden whitespace-nowrap pb-1 select-none">
                {op.op_key}{" "}:{" "}
                <span
                  className={`${
                    op.op_key == ele.correct_op
                      ? "text-color-accent-green"
                      : "text-color-text"
                  } text-sm font-medium select-none`}
                >
                  {op.op_value}
                </span>
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuestionCard;
