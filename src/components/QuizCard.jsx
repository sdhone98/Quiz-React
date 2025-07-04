const QuizCard = ({ questionIndex, questionData, onSelect }) => {
  return (
    <div className="w-1/2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <p class="my-4 font-bold text-lg text-color-text-1">
         Question {questionIndex + 1}
      </p>

      <h2 class="text-2xl font-bold dark:text-white mb-5">
        {questionData.question}
      </h2>
      <div className="w-2/3 flex-row">
        {Object.entries(questionData.options).map(([key, value], index) => (
          <div key={key} className="flex items-center w-full">
            <label className="w-1/18 text-color-text-1 font-bold">
              {String.fromCharCode(65 + index)}.
            </label>
            <button
              onClick={() => onSelect({ questionIndex, selected: key })}
              className="w-full bg-color-button-1 px-4 py-2.5 mb-2 hover:bg-color-accent-1 box-border text-left rounded-2xl"
            >
              {value}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
