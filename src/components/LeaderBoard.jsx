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
  const [topUsersData, setTopUsersData] = useState([]);
  const [selectedTabOption, setSelectedTabOption] = useState("Top");
  const [filterData, setFilterData] = useState({
    topic: null,
    difficulty: null,
  });

  useEffect(() => {
    loadTopUsersData();
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
      url: BASE_URL + API_END_POINTS.GET_LEADER_BOARD_TABLE_DATA,
      method: "GET",
      params: reqParams,
    });

    if (success) {
      setResultTblData(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const loadTopUsersData = async () => {
    const reqParams = {};
    if (filterData.topic !== null) {
      reqParams["topic"] = filterData.topic;
    }
    if (filterData.difficulty !== null) {
      reqParams["difficulty"] = filterData.difficulty;
    }

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.GET_LEADER_BOARD_TOP_USERS_DATA,
      method: "GET",
      params: reqParams,
    });

    if (success) {
      setTopUsersData(data);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };

  const handelOnSearch = () => {
    if (selectedTabOption === "Top") {
      loadTopUsersData();
    } else {
      loadTblData();
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
          <div className="flex text-sm font-bold bg-color-bg-1 gap-8 px-8 h-full rounded-lg items-center">
            <span
              onClick={() => setSelectedTabOption("Top")}
              className={`${
                selectedTabOption === "Top" && "border-b border-color-btn"
              } px-6 pb-2 cursor-pointer`}
            >
              Top 3
            </span>
            <span
              onClick={() => {
                loadTblData(), setSelectedTabOption("Result");
              }}
              className={`${
                selectedTabOption === "Result" && "border-b border-color-btn"
              } px-6 pb-2 cursor-pointer`}
            >
              All
            </span>
          </div>
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
            <CustomBtn label={"Search"} onBtnClick={handelOnSearch} />
          </div>
        </div>
        {selectedTabOption === "Result" ? (
          <div className="w-full h-[80%]">
            <ResultTable tableData={resultTblData} isSearchOn={true} />
          </div>
        ) : (
          <div className="w-full h-[80%]">
            <LeaderBoardTopUsers usersData={topUsersData} />
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchTable;

function LeaderBoardTopUsers({ usersData }) {
  const [hoveredDivID, setHoveredDivID] = useState(null);
  const firstRankUser = usersData.find((user) => user.position === 1) || {
    name: null,
    percentage: null,
    username: null,
  };
  const secondRankUser = usersData.find((user) => user.position === 2) || {
    name: null,
    percentage: null,
    username: null,
  };
  const thirdRankUser = usersData.find((user) => user.position === 3) || {
    name: null,
    percentage: null,
    username: null,
  };

  const StudentIcon = ({ size = "small" }) => {
    const commonProps = {
      className:
        size === "small"
          ? "w-full h-full text-color-text-light p-8"
          : "w-full h-full text-color-text-light p-2",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "aria-hidden": "true",
    };

    return (
      <svg
        {...commonProps}
        width={size === "small" ? 16 : 24}
        height={size === "small" ? 16 : 24}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={size === "small" ? 1.2 : 1.5}
      >
        <path d="M14.6144 7.19994c.3479.48981.5999 1.15357.5999 1.80006 0 1.6569-1.3432 3-3 3-1.6569 0-3.00004-1.3431-3.00004-3 0-.67539.22319-1.29865.59983-1.80006M6.21426 6v4m0-4 6.00004-3 6 3-6 2-2.40021-.80006M6.21426 6l3.59983 1.19994M6.21426 19.8013v-2.1525c0-1.6825 1.27251-3.3075 2.95093-3.6488l3.04911 2.9345 3-2.9441c1.7026.3193 3 1.9596 3 3.6584v2.1525c0 .6312-.5373 1.1429-1.2 1.1429H7.41426c-.66274 0-1.2-.5117-1.2-1.1429Z" />
      </svg>
    );
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center scale-130">
        <div
          id="top-3"
          className="relative w-48 h-68 flex items-end justify-center"
        >
          <div
            onMouseEnter={() => setHoveredDivID(1)}
            onMouseLeave={() => setHoveredDivID(null)}
            className={`${
              hoveredDivID === 1 && "shadow-2xl"
            } absolute top-0 w-36 h-36 bg-transperant rounded-full z-1 border-2 border-color-accent-blue bg-color-bg shadow-color-accent-blue transition-shadow duration-300 ease-in-out`}
          >
            <StudentIcon size="small" />
          </div>
          <div
            onMouseEnter={() => setHoveredDivID(1)}
            onMouseLeave={() => setHoveredDivID(null)}
            className="absolute top-31 w-8 h-8 bg-color-accent-blue rounded-lg z-2 rotate-45 flex justify-center items-center"
          >
            <span className="block -rotate-45 font-bold text-color-text-dark text-xl select-none">
              {2}
            </span>
          </div>
          <div
            onMouseEnter={() => setHoveredDivID(1)}
            onMouseLeave={() => setHoveredDivID(null)}
            className="absolute bottom-0 w-48 h-48 bg-color-bg-1 rounded-l-2xl flex flex-col justify-end items-center pb-6 select-none"
          >
            <p className="text-2xl font-normal">
              {thirdRankUser.percentage || "N/A"}
              <span className="text-sm">%</span>
            </p>
            <p className="text-xl font-semibold">
              {thirdRankUser.name || "N/A"}
            </p>
            <p className="text-sm font-light">
              {thirdRankUser.username || "N/A"}
            </p>
          </div>
        </div>

        <div
          id="top-1"
          className="relative  w-64 h-68 flex items-end justify-center"
        >
          <div
            onMouseEnter={() => setHoveredDivID(2)}
            onMouseLeave={() => setHoveredDivID(null)}
            className={`${
              hoveredDivID === 2 && "shadow-2xl"
            } absolute -top-14 w-40 h-40 bg-transperant rounded-full z-3 border-4 border-color-accent-gold bg-color-bg flex justify-center items-center pb-4 shadow-color-accent-gold transition-shadow duration-300 ease-in-out`}
          >
            <StudentIcon size="large" />
          </div>
          <div
            onMouseEnter={() => setHoveredDivID(2)}
            onMouseLeave={() => setHoveredDivID(null)}
            className="absolute top-20 w-10 h-10 bg-color-accent-gold rounded-lg z-3 rotate-45 flex justify-center items-center"
          >
            <span className="block -rotate-45 font-bold text-color-text-dark text-xl select-none">
              {1}
            </span>
          </div>
          <div
            onMouseEnter={() => setHoveredDivID(2)}
            onMouseLeave={() => setHoveredDivID(null)}
            className="absolute bottom-0 w-64 h-64 bg-color-bg-2 rounded-t-2xl flex flex-col justify-end items-center pb-8 z-2 select-none"
          >
            <p className="text-3xl font-semibold">
              {firstRankUser.percentage || "N/A"}
              <span className="text-sm">%</span>
            </p>
            <p className="text-xl font-semibold">
              {firstRankUser.name || "N/A"}
            </p>
            <p className="text-lg">{firstRankUser.username || "N/A"}</p>
          </div>
        </div>

        <div
          id="top-2"
          className="relative  w-48 h-68 flex items-end justify-center"
        >
          <div
            onMouseEnter={() => setHoveredDivID(3)}
            onMouseLeave={() => setHoveredDivID(null)}
            className={`${
              hoveredDivID === 3 && "shadow-2xl"
            } absolute top-0 w-36 h-36 bg-transperant rounded-full z-1 border-2 border-color-accent-green bg-color-bg shadow-color-accent-green transition-shadow duration-300 ease-in-out`}
          >
            <StudentIcon size="small" />
          </div>
          <div
            onMouseEnter={() => setHoveredDivID(3)}
            onMouseLeave={() => setHoveredDivID(null)}
            className="absolute top-31 w-8 h-8 bg-color-accent-green rounded-lg z-2 rotate-45 flex justify-center items-center"
          >
            <span className="block -rotate-45 font-bold text-color-text-dark text-xl select-none">
              {3}
            </span>
          </div>
          <div
            onMouseEnter={() => setHoveredDivID(3)}
            onMouseLeave={() => setHoveredDivID(null)}
            className="absolute bottom-0 w-48 h-48 bg-color-bg-1 rounded-r-2xl flex flex-col justify-end items-center pb-6 select-none"
          >
            <p className="text-2xl font-semibold">
              {secondRankUser.percentage || "N/A"}
              <span className="text-sm">%</span>
            </p>
            <span className="text-lg font-normal">
              {secondRankUser.name || "N/A"}
            </span>
            <p className="text-md font-light">
              {secondRankUser.username || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
