const ResultTable = ({ tableData, tableHeader}) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg border border-color-text-1 w-full">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-color-navbar text-color-text-1 ">
          <tr>
            <th scope="col" className="p-4"></th>
            {tableHeader.map((i) => (
              <th key={i} scope="col" className="px-6 py-3 text-center">
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan={tableHeader.length + 1} className="text-center py-4">
                No results found.
              </td>
            </tr>
          ) : (
            tableData.map((item, index) => (
              <tr
                key={index}
                className="bg-color-background border-b dark:border-gray-700 border-gray-200 hover:bg-color-button-3"
              >
                <td className="w-4 p-4"></td>
                <th scope="row" className="px-6 py-4 text-center">
                  {item.topic_name}
                </th>
                <td className="px-6 py-4 text-center">
                  {item.difficulty_level}
                </td>
                <td className="px-6 py-4 text-center">{item.set_type}</td>
                <td className="px-6 py-4 text-center">
                  {item.total_questions}
                </td>
                <td className="px-6 py-4 text-center">
                  {item.correct_answers}
                </td>
                <td className="px-6 py-4 text-center">{item.wrong_answers}</td>
                <td className="px-6 py-4 text-center">{item.total_time}</td>
                <td className="px-6 py-4 text-center">{item.completed_time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
