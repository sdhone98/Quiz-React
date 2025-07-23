import React, { useEffect, useState } from "react";
import ResultTable from "../../components/ResultTable";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useToast } from "../../context/ToastContext";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";
import { apiRequest } from "../../utils/api";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const today = new Date();

const tableHeader = [
  "Topic",
  "difficulty",
  "Set",
  "Total Questions",
  "Correct Count",
  "Wrong Count",
  "Total Time",
  "Taken Time",
];

const StudentDashboard = () => {
  const navigate = useNavigate();

  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const user = useSelector((state) => state.user.user);
  const [resultData, setResultData] = useState([]);

  const msgLine1 = "Ready to challenge yourself and grow your skills?";
  const msgLine2 = "Pick a topic and show us what you've got!";

  useEffect(() => {
    const loadResultData = async () => {
      const { success, data, error } = await apiRequest({
        url: BASE_URL + API_END_POINTS.GET_RESULT,
        method: "GET",
      });

      if (success) {
        setResultData(data);
      } else {
        showToast(
          "Error",
          "Failed to fetch results",
          error?.data?.message || "Unexpected error"
        );
      }
    };
    if (user?.userId) loadResultData();
  }, [user]);

  return (
    <section className="max-w-screen h-full flex justify-center items-center bg-color-background">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-none dark:text-white">
            Welcome, {user.name}
          </h1>
          <p className="max-w-2xl font-light text-color-text-1 text-lg">
            {msgLine1}
          </p>
          <p className="max-w-2xl mb-6 font-light text-color-text-1 text-lg">
            {msgLine2}
          </p>
          <p className="max-w-2xl mb-6 font-light text-color-text-1 text-lg">
            {formattedDate}
          </p>
          <a
            onClick={() => {
              navigate("/student/quiz/listing");
            }}
            className={`cursor-pointer inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
          >
            Start Quiz
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <div className="w-full f-hull flex items-center justify-between"></div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <ResultTable tableData={resultData} tableHeader={tableHeader} />
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
