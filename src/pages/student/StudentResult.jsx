import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ResultTable from "../../components/ResultTable";
import { useToast } from "../../context/ToastContext";
import { apiRequest } from "../../utils/api";
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

function StudentResult() {
  const { showToast } = useToast();
  const user = useSelector((state) => state.user.user);
  const [resultData, setResultData] = useState([]);

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
    <div className="w-full h-full text-color-text bg-color-bg py-8 px-20">
      <h3 className="w-full mb-8 text-5xl font-extrabold tracking-tight select-none pointer-events-none">
        Quiz History
      </h3>
      <div className="flex w-full">
        <div className="w-2/3">
          <ResultTable tableData={resultData}/>
        </div>
      </div>
    </div>
  );
}

export default StudentResult;
