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
import CustomBtn from "../../components/CustomBtn";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

const today = new Date();

const arrowIcon = (
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
);

const StudentDashboard = () => {
  const navigate = useNavigate();

  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const user = useSelector((state) => state.user.user);
  const [resultData, setResultData] = useState([]);

  const msgLine =
    "Ready to challenge yourself and grow your skills? Pick a topic and show us what you've got!";

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
    <section className="w-screen max-w-screen h-full flex justify-center items-center bg-color-bg px-20 lg:px-48 gap-2">
      <div className="w-1/2 p-2">
        <div className="place-self-start p-4">
          <h1 className="mb-4 text-5xl font-bold tracking-tight leading-none text-color-text select-none">
            Welcome, {user.name}
          </h1>
          <p className="w-3/4 text-color-text text-sm font-semibold mb-2 select-none">
            {msgLine}
          </p>
          <p className="mb-4 font-light text-color-text text-sm select-none">
            {formattedDate}
          </p>
          <CustomBtn
            label={"Start Quiz"}
            onBtnClick={() => navigate("/student/quiz/listing")}
            icon={arrowIcon}
          />
        </div>
      </div>
      <div className="w-1/2 p-2">
        <ResultTable tableData={resultData} />
      </div>
    </section>
  );
};

export default StudentDashboard;
