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

const dashBoardData = [
  {
    key: "Total Quizzes",
    value: "totalQuizzes",
  },
  {
    key: "Total Quizzes",
    value: "activeQuizzes",
  },
  {
    key: "Quiz Takers",
    value: "totalStudentsParticipated",
  },
  {
    key: "Your Quizzes",
    value: "userTotalQuizzes",
  },
  {
    key: "Your Active Quizzes",
    value: "userActiveQuizzes",
  },
  {
    key: "Your Quiz Takers",
    value: "userTotalStudentsParticipated",
  },
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
    <section className="max-w-screen w-screen h-full flex flex-col bg-color-bg py-8 px-20 items-center">
      <div className="w-full">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight leading-none text-color-text">
          QuickQuiz - Teacher Dashboard
        </h1>
        <p className="max-w-2xl text-color-text-sub text-lg font-normal">
          Logged in as: <span className="font-semibold">Mr. Sagar Dhone</span>
        </p>
      </div>
      <div className="h-9/10 w-full lg:px-48 flex items-center justify-center gap-4">
        <div className="w-full flex flex-col gap-2">
          <div className="w-full rounded-lg bg-color-bg-1">
            <dl className="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:grid-cols-2 xl:grid-cols-3 text-color-text sm:p-8">
              {dashBoardData.map((ele) => (
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">
                    {dashboardData[ele.value]}
                  </dt>
                  <dd className="text-color-text-light text-center text-sm">
                    {ele.key}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {/* <div className="flex gap-2">
            <a
              onClick={() => navigate("/teacher/quiz")}
              className={`w-36 h-12 cursor-pointer inline-flex items-center justify-center text-sm font-medium text-center text-color-text-dark bg-color-btn rounded-4xl hover:bg-color-btn-hover hover:text-color-text`}
            >
              View Quizzes
            </a>
            <a
              onClick={() => navigate("/teacher/quiz/questions-add")}
              className={`w-36 h-12  cursor-pointer inline-flex items-center justify-center text-sm font-medium text-center text-color-text-dark bg-color-btn rounded-4xl hover:bg-color-btn-hover hover:text-color-text`}
            >
              Add Questions
            </a>
            <a
              onClick={() => navigate("/teacher/quiz/create/")}
              className={`w-36 h-12  cursor-pointer inline-flex items-center justify-center text-sm font-medium text-center text-color-text-dark bg-color-btn rounded-4xl hover:bg-color-btn-hover hover:text-color-text`}
            >
              Create Quiz
            </a>
          </div> */}
        </div>

        <div className="w-1/2 h-1/2  flex justify-center items-center">
          <ResultTable tableData={resultData} />
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
