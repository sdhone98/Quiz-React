import { useState } from "react";

const QuestionCard = ({ optionsList, removeQuestion }) => {
  return (
    <div className="flex-col h-full p-2">
      <h2 className="text-xl font-semibold text-color-text-1 sm:text-2xl mb-4">
        Question List
      </h2>
      <div className="flex-col h-8/9 overflow-y-auto scrollbar-hide">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 p-2">
          
          {optionsList.map((ele, index) => (
            <div class="grid grid-cols-1 rounded-lg border p-4 shadow-sm md:p-6 bg-color-button-3">
              <div className="flex justify-between">
              <label
                id="question"
                className="text-lg font-bold text-color-text-1"
              >
                Q.{index + 1}
                {" - "}
                {ele.question}
              </label>
            {true && <button
              type="button"
              onClick={()=> removeQuestion(ele)}
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close menu</span>
            </button>}
          </div>
              <div className="flex-col gap-2">
                {ele.optionsList.map(({ op_key, op_value }) => (
                  <div className="flex mt-1">
                    <label
                      key={op_key}
                      id={op_key}
                      className="text-base font-normal text-color-text-1"
                    >
                      {op_key} :
                    </label>
                    <label
                      className={`${
                        op_key == ele.correct_op
                          ? "text-green-400"
                          : "text-color-text-1"
                      } px-2 text-base font-semibold"`}
                    >
                      {op_value}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
