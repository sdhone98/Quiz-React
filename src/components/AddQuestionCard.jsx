import React, { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { v4 as uuidv4 } from "uuid";
import CustomBtn from "./CustomBtn";

const optionsLits = ["A", "B", "C", "D"];
function AddQuestionCard({ onSave }) {
  const { showToast } = useToast();
  const [selectedOption, setSelectedOption] = useState(null);
  const [qDetails, setQDetails] = useState(null);

  const saveQuestionDetails = (e) => {
    console.log("selectedOption -> ", e.target.correctAnswer.value);
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
    onSave(q_data);
    // e.target.reset();
    // setSelectedOption(null);
  };

  return (
    <div>
      <form
        action="#"
        method="get"
        id="defaultModal"
        className="w-full overflow-x-hidden overflow-y-auto md:h-full"
        onSubmit={saveQuestionDetails}
      >
        <div className="bg-color-bg-2 rounded-lg shadow">
          <div className="grid grid-cols-10 items-center justify-between px-6 py-4 rounded-t">
            <h3 className="col-span-1 text-lg font-bold text-color-text text-center p-2">
              1
            </h3>
            <input
              type="text"
              name="question"
              id="question"
              className="col-span-9 bg-color-bg-2 text-color-text text-lg font-bold rounded-lg block w-full p-2.5"
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
                    className="w-4 h-3 text-color-text rounded-4xl hover:cursor-pointer"
                    onChange={() => setSelectedOption(label)}
                    checked={selectedOption === label}
                  />
                </span>
                <div className="col-span-9 pb-2">
                  <input
                    type="text"
                    name={`option-${label}`}
                    id={`option-${label}`}
                    className="w-full bg-color-bg-2 text-color-text text-sm rounded-lg block p-2.5"
                    placeholder={`Option ${label}`}
                    onFocus={() => setSelectedOption(label)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full px-6 py-4 flex justify-between items-center">
            <div>
              <p className="w-fit h-fit rounded-md text-md text-color-text-dark py-1 px-3 bg-color-bg-2">
                Selected Option:{" "}
                <span className="font-medium">{selectedOption || "-"}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <CustomBtn label={"Apply"} />
              <CustomBtn
                label={"Reset"}
                onBtnClick={() => setSelectedOption(null)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddQuestionCard;
