import React, { useEffect, useState } from "react";
import ResultTable from "../../components/ResultTable";
import { useToast } from "../../context/ToastContext";
import { apiRequest } from "../../utils/api";
import { useSelector } from "react-redux";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

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
    <section className="max-w-screen w-screen h-full bg-color-bg items-center text-color-text">
      <div className="flex flex-col mx-48 h-full">
        <h3 className="w-full mt-12 mb-8 text-3xl font-extrabold tracking-tight select-none pointer-events-none">
          Your Quiz Result
        </h3>
        <div className="flex w-full">
          <div className="w-full">
            <ResultTable tableData={resultData} isSearchOn={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentResult;
