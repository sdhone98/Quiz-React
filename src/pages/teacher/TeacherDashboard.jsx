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
  const [dashboardData, setDashboardData] = useState({
    totalQuizzes: null,
    activeQuizzes: null,
    totalStudentsParticipated: null,
    userTotalQuizzes: null,
    userActiveQuizzes: null,
    userTotalStudentsParticipated: null,
  });

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

    const loadDashboardData = async () => {
      const { success, data, error } = await apiRequest({
        url: BASE_URL + API_END_POINTS.GET_TEACHERS_DASHBOARD,
        method: "GET",
      });

      if (success) {
        setDashboardData({
          totalQuizzes: data.totalQuizzes,
          activeQuizzes: data.activeQuizzes,
          totalStudentsParticipated: data.totalStudentsParticipated,
          userTotalQuizzes: data.userTotalQuizzes,
          userActiveQuizzes: data.userActiveQuizzes,
          userTotalStudentsParticipated: data.userTotalStudentsParticipated,
        });
      } else {
        showToast(
          "Error",
          "Failed to fetch results",
          error?.data?.message || "Unexpected error"
        );
      }
    };
    loadDashboardData();

    if (user?.userId) loadResultData();
  }, []);

  return (
    <section className="max-w-screen w-screen h-full flex flex-col bg-color-background py-8 px-20 items-center">
      <div className="w-full">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-color-text-1">
          QuickQuiz - Teacher Dashboard
        </h1>
        <p className="max-w-2xl text-color-text-1 text-lg font-normal">
          Logged in as: <span className="font-semibold">Mr. Sagar Dhone</span>
        </p>
      </div>
      <div className="h-9/10 w-full lg:px-36 flex flex-col items-center justify-center">
        <div className="w-full h-fit flex justify-between items-center">
          <div
            className="w-1/2 p-4 rounded-lg bg-color-button-3"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:grid-cols-2 xl:grid-cols-3 text-color-text-1 sm:p-8">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">
                  {dashboardData.totalQuizzes}
                </dt>
                <dd className="text-color-accent-1 text-center text-sm">
                  Total Quizzes
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center text-sm">
                <dt className="mb-2 text-3xl font-extrabold">
                  {dashboardData.activeQuizzes}
                </dt>
                <dd className="text-color-accent-1 text-center">
                  Active Quizzes
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center text-sm">
                <dt className="mb-2 text-3xl font-extrabold">
                  {dashboardData.totalStudentsParticipated}
                </dt>
                <dd className="text-color-accent-1 text-center">Quiz Takers</dd>
              </div>
              <div className="flex flex-col items-center justify-center text-sm">
                <dt className="mb-2 text-3xl font-extrabold">
                  {dashboardData.totalStudentsParticipated}
                </dt>
                <dd className="text-color-accent-1 text-center">
                  Your Quizzes
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center text-sm">
                <dt className="mb-2 text-3xl font-extrabold">
                  {dashboardData.totalStudentsParticipated}
                </dt>
                <dd className="text-color-accent-1 text-center">
                  Your Active Quizzes
                </dd>
              </div>
              <div className="flex flex-col items-center justify-center text-sm">
                <dt className="mb-2 text-3xl font-extrabold">
                  {dashboardData.totalStudentsParticipated}
                </dt>
                <dd className="text-color-accent-1 text-center">
                  Your Quiz Takers
                </dd>
              </div>
            </dl>
          </div>

          <div className="w-1/2 p-4 h-1/2 flex justify-center items-center">
            <ResultTable tableData={resultData} tableHeader={tableHeader} />
          </div>
        </div>
        <div className="flex w-full gap-2 py-4 items-start">
          <a
            onClick={() => navigate("/teacher/quiz")}
            className={`w-36 h-12 cursor-pointer inline-flex items-center justify-center text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
          >
            View Quizzes
          </a>
          <a
            onClick={() => navigate("/teacher/quiz/questions-add")}
            className={`w-36 h-12  cursor-pointer inline-flex items-center justify-center text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
          >
            Add Questions
          </a>
          <a
            onClick={() => navigate("/teacher/quiz/create/")}
            className={`w-36 h-12  cursor-pointer inline-flex items-center justify-center text-sm font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
          >
            Create Quiz
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
