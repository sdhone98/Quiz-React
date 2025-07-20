const QuizCard = ({ questionIndex, questionData, onSelect }) => {
  return (
    <div className="w-2/3 p-4">
      <p className="my-4 text-lg text-color-text-1">
        Question No : {questionIndex + 1}
      </p>

      <h2 className="text-3xl font-bold dark:text-white mb-5">
        {questionData.question_text}
      </h2>
      <div className="w-2/3 flex-row">
        {Object.entries(questionData.options).map(([key, value], index) => (
          <div key={key} className="flex items-center w-full p-1 pb-2">
            <label className="w-fit text-color-text-1 font-bold pr-4">
              {String.fromCharCode(65 + index)}.
            </label>
            <a
              onClick={() =>
                onSelect({ questionId: questionData.id, selectedOption: key })
              }
              className="max-w-full text-color-text-1 hover:cursor-pointer box-border text-left rounded-2xl text-md"
            >
              {value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
