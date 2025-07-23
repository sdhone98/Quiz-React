import React, { useEffect, useState } from "react";
import ResultTable from "../../components/ResultTable";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import { useSelector } from "react-redux";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

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

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const user = useSelector((state) => state.user.user);
  const [resultData, setResultData] = useState([]);

  useEffect(() => {
    const loadResultData = async () => {
      const { success, data, error } = await apiRequest({
        url: BASE_URL + API_END_POINTS.GET_RESULT,
        method: "GET"
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
    <section className="max-w-screen h-full flex-col bg-color-background py-8 px-20">
      <div className="mb-8">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-color-text-1">
          QuickQuiz - Teacher Dashboard
        </h1>
        <p className="max-w-2xl text-color-text-1 text-lg font-normal">
          Logged in as: <span className="font-semibold">Mr. Sagar Dhone</span>
        </p>
      </div>
      <div className="w-full h-fit flex justify-between items-center">
        <div className="max-w-2xl h-1/2">
          <div
            className="p-4 rounded-lg md:p-8 bg-color-button-3"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:grid-cols-2 xl:grid-cols-3 text-color-text-1 sm:p-8">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                <dd className="text-color-accent-1 text-center">
                  Total Quizzes Created
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                <dd className="text-color-accent-1 text-center">
                  Active Quizzes
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                <dd className="text-color-accent-1 text-center">
                  Total Students Participated
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="w-1/2 p-4 h-1/2">

        <ResultTable tableData={resultData} tableHeader={tableHeader} />
        </div>
      </div>
      <div className="flex max-w-xl gap-2">
        <a
          onClick={() => navigate("/teacher/quiz")}
          className={`cursor-pointer inline-flex items-center justify-center px-5 py-3  text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
        >
          View Quizzes
        </a>
        <a
          onClick={() => navigate("/teacher/quiz/questions-add")}
          className={`cursor-pointer inline-flex items-center justify-center px-4 py-3  text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
        >
          Add Questions
        </a>
        <a
          onClick={() => navigate("/teacher/quiz/create/")}
          className={`cursor-pointer inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
        >
          Create Quiz
        </a>
      </div>
    </section>
  );
};

export default TeacherDashboard;
