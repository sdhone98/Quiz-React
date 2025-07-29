import React, { useEffect, useState } from "react";

const searchIcon = (
  <svg
    class="w-4 h-4 text-color-text"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-width="2"
      d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
  </svg>
);

const ResultTable = ({ tableData, isSearchOn = false }) => {
  const [search, setSearch] = useState("");
  const tableHeader = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const filteredData = tableData.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className={`${!isSearchOn && "hidden"} flex justify-end`}>
        <div class="relative mb-6 w-1/3 max-w-sm">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {searchIcon}
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="input-group-1"
            class="bg-color-bg-2 text-sm rounded-lg block w-full ps-10 p-2.5 text-color-text placeholder:text-color-text"
            placeholder="Search for items"
          />
        </div>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg w-full h-full scrollbar-hide">
        <table className="w-full text-sm text-left rtl:text-right text-color-bg-2">
          <thead className="text-sm bg-color-bg-1 text-color-text">
            <tr>
              <th scope="col" className="p-4"></th>
              {tableHeader.map((key) => (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-3 text-center text-color-text"
                >
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={tableHeader.length + 1}
                  className="text-color-text text-center py-4"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
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
    </div>
  );
};

export default ResultTable;
