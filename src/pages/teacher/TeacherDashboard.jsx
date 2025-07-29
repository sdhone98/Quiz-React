import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/api";
import { useToast } from "../../context/ToastContext";
import { useSelector } from "react-redux";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";
import TopicHeroSection from "../../components/TopicHeroSection";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

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
  const { showToast } = useToast();
  const [dashboardData, setDashboardData] = useState({
    totalQuizzes: null,
    activeQuizzes: null,
    totalStudentsParticipated: null,
    userTotalQuizzes: null,
    userActiveQuizzes: null,
    userTotalStudentsParticipated: null,
  });

  useEffect(() => {
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
  }, []);

  return (
    <section className="max-w-screen w-screen h-full bg-color-bg items-center text-color-text">
      <div className="flex flex-col mx-48 h-full">
        <div className="w-full my-12">
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none">
            QuickQuiz - Teacher Dashboard
          </h1>
          <p className="max-w-2xl text-color-text-light text-lg font-normal">
            Logged in as: <span className="font-semibold">Sagar Dhone</span>
          </p>
        </div>
        <div className="w-full h-2/3 flex items-center justify-start gap-4">
          <div className="w-1/2 h-3/4 pt-10 p-8">
            <div className="h-full rounded-lg bg-color-bg-1 grid grid-cols-3 grid-rows-2 gap-2 w-full p-2">
              {dashBoardData.map((ele, idx) => (
                <div
                  key={ele.key}
                  className={
                    "bg-color-bg p-5 text-center flex flex-col justify-center items-center rounded-lg select-none hover:text-color-btn hover:cursor-pointer" +
                    (idx === idx
                      ? " transition-all duration-300 ease-in-out hover:scale-90"
                      : "")
                  }
                >
                  <dt className="mb-2 text-3xl font-extrabold">
                    {dashboardData[ele.value]}
                  </dt>
                  <dd className="text-center text-sm">{ele.key}</dd>
                </div>
              ))}
            </div>
          </div>
          <div className="w-1/2 h-3/4">{<TopicHeroSection/>}</div>
        </div>
      </div>
    </section>
  );
};

export default TeacherDashboard;
