const ResultTable = ({ tableData }) => {
  const tableHeader = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  return (
    <div className="overflow-x-auto shadow-md rounded-lg w-full h-full scrollbar-hide">
      <table className="w-full text-sm text-left rtl:text-right text-color-bg-2">
        <thead className="text-sm bg-color-bg-1 text-color-text">
          <tr>
            <th scope="col" className="p-4"></th>
            {tableHeader.map((key) => (
              <th key={key} scope="col" className="px-6 py-3 text-center text-color-text">
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
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
                className="bg-color-bg-2 hover:bg-color-bg text-color-text-light"
              >
                <td className="w-4 p-4"></td>
                {tableHeader.map((key) => (
                  <td key={key} className="px-6 py-4 text-center">
                    {item[key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
