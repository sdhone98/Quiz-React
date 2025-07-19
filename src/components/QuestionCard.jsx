import { useState } from "react";

const QuestionCard = ({ questionsData, removeQuestion }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="overflow-y-auto scrollbar-hide max-h-[80vh] h-full px-2 flex-col w-1/2 gap-2">
      {questionsData.map((ele, index) => (
        <div
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="bg-color-button-3 rounded-lg p-4 mb-2"
        >
          <div className="flex justify-between text-color-text-1">
            <p className="max-w-[95%] whitespace-nowrap w-fit text-lg font-bold text-color-text-1 overflow-hidden">
              {index + 1}.{" "}
              <span className="text-2xl font-bold whitespace-nowrap">
                {ele.question}
              </span>
            </p>

            {hoveredIndex === index && (
              <span
                className="px-2 py-1 bg-color-button-3 text-center rounded-md cursor-pointer"
                onClick={() => removeQuestion(ele)}
              >
                Discard
              </span>
            )}
          </div>
          {ele.optionsList.map((op) => (
            <div>
              <p className="text-md text-color-text-1 overflow-hidden whitespace-nowrap pb-1">
                {op.op_key}:{" "}
                <span
                  className={`${
                    op.op_key == ele.correct_op
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
  );
};

export default QuestionCard;
