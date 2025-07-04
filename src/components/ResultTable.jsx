import React from "react";

const products = [
  {
    topicName: 'Apple MacBook Pro 17"',
    obtainedMarks: 80,
    totalMarks: 100,
  },
  {
    topicName: "Samsung Galaxy S22",
    obtainedMarks: 80,
    totalMarks: 100,
  },
  {
    topicName: "Sony WH-1000XM5",
    obtainedMarks: 80,
    totalMarks: 100,
  },
  {
    topicName: "Dell XPS 13",
    obtainedMarks: 80,
    totalMarks: 100,
  },
  {
    topicName: "Apple iPad Pro",
    obtainedMarks: 80,
    totalMarks: 100,
  },
];

const tableHeader = ["Topic Name", "Total Marks", "Obtained Marks"];

const ResultTable = () => {
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg border border-color-text-1">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs uppercase bg-color-navbar text-color-text-1 ">
          <tr>
            <th scope="col" class="p-4"></th>
            {tableHeader.map((i) => (
              <th scope="col" class="px-6 py-3">
                {i}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr class="bg-color-background border-b dark:border-gray-700 border-gray-200 hover:bg-color-button-3">
              <td class="w-4 p-4"></td>
              <th
                scope="row"
                class="px-6 py-4 font-medium text-color-text-1 whitespace-nowrap"
              >
                {item.topicName}
              </th>
              <td class="px-6 py-4">{item.totalMarks}</td>
              <td class="px-6 py-4">{item.obtainedMarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
