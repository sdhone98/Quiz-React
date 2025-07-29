import React, { useEffect, useState } from "react";
import ResultTable from "./ResultTable";
import { apiRequest } from "../utils/api";
import { BASE_URL_END_POINT, API_END_POINTS } from "../constants/apiEndPoints";
import DropDown from "./DropDown";
import { useSelector } from "react-redux";
import { ALL_PERPOSE } from "../constants/allPurpose";
import CustomBtn from "./CustomBtn";
import { useToast } from "../context/ToastContext";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

function SearchTable() {
  const { showToast } = useToast();
  const topicDetails = useSelector((state) => state.topic.topics.data);

  const [resultTblData, setResultTblData] = useState([]);
  const [filterData, setFilterData] = useState({
    topic: null,
    difficulty: null,
  });

  useEffect(() => {
    loadTblData();
  }, []);

  const loadTblData = async () => {
    const reqParams = {};

    if (filterData.topic !== null) {
      reqParams["topic"] = filterData.topic;
    }
    if (filterData.difficulty !== null) {
      reqParams["difficulty"] = filterData.difficulty;
    }

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_LEADER_BOARD_DATA,
      method: "GET",
      params: reqParams,
    });

    if (success) {
      setResultTblData(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const handelTopicSelection = (ele) => {
    setFilterData((prev) => ({
      ...prev,
      topic: ele.id,
    }));
  };
  const handelDifficultySelection = (ele) => {
    setFilterData((prev) => ({
      ...prev,
      difficulty: ele.id,
    }));
  };
  return (
    <section className="max-w-screen w-screen h-full bg-color-bg items-center text-color-text">
      <div className="flex flex-col mx-48 h-full">
        <div className="mt-12 mb-8 flex justify-between items-center">
          <h1 className="mb-2 text-3xl font-extrabold text-color-text block">
            Leader Board
          </h1>
          <div className="h-full flex gap-2">
            <DropDown
              label={"Topic"}
              onSelect={handelTopicSelection}
              optionsList={topicDetails}
              isDisable={false}
            />
            <DropDown
              label={"Difficulty"}
              onSelect={handelDifficultySelection}
              optionsList={ALL_PERPOSE.DIFFICULTY_OBJ_FORMAT_TYPES}
              isDisable={false}
            />
            <CustomBtn label={"Search"} onBtnClick={loadTblData} />
          </div>
        </div>
        <div className="w-full">
          <ResultTable tableData={resultTblData} isSearchOn={true} />
        </div>
      </div>
    </section>
  );
}

export default SearchTable;
