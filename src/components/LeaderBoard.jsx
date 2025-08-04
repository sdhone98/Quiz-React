import React, { useEffect, useState } from "react";
import ResultTable from "./ResultTable";
import { apiRequest } from "../utils/api";
import { BASE_URL_END_POINT, API_END_POINTS } from "../constants/apiEndPoints";
import DropDown from "./DropDown";
import { useSelector } from "react-redux";
import { ALL_PERPOSE } from "../constants/allPurpose";
import CustomBtn from "./CustomBtn";
import { useToast } from "../context/ToastContext";
import CountUp from "react-countup";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;

function LeaderBoard() {
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
          <div className="flex text-sm font-bold gap-4 px-8 h-full rounded-lg items-center">
            <span
              onClick={() => setSelectedTabOption("Top")}
              className={`${
                selectedTabOption === "Top" && "border-b border-color-btn"
              } px-4 pb-2 cursor-pointer`}
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

export default LeaderBoard;

function LeaderBoardTopUsers({ usersData }) {
  const sortedUsers = usersData.slice().sort((a, b) => {
    const aIndex = podiumOrder.indexOf(a.position);
    const bIndex = podiumOrder.indexOf(b.position);

    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.rank - b.rank;
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center scale-130">
        {sortedUsers.map((user) => (
          <PodiumUser
            key={user.position}
            rank={user.position}
            percentage={user.percentage}
            name={user.name}
            userName={user.username}
            cssDetails={classDetails(user.position)}
          />
        ))}
      </div>
    </div>
  );
}

const podiumOrder = [3, 1, 2];

const RANK_ACCENT_COLOR_CLASSES = {
  1: "bg-color-accent-gold border-color-accent-gold shadow-color-accent-gold",
  2: "bg-color-accent-green border-color-accent-green shadow-color-accent-green",
  3: "bg-color-accent-blue border-color-accent-blue shadow-color-accent-blue",
};

const ACCENT_COLOR_CLASSES = {
  1: "color-accent-gold",
  2: "color-accent-green",
  3: "color-accent-blue",
};

const DIV_ROUNDED_CLASSES = {
  1: "rounded-t-2xl",
  2: "rounded-r-2xl",
  3: "rounded-l-2xl",
};

const StudentIcon = ({ iconSize = "small", userRank }) => {
  const isSmall = iconSize === "small";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={isSmall ? 1.5 : 1.2}
      className={`w-full h-full text-${ACCENT_COLOR_CLASSES[userRank]} ${
        isSmall ? "p-8" : "p-6"
      }`}
    >
      <path d="M14.6144 7.19994c.3479.48981.5999 1.15357.5999 1.80006 0 1.6569-1.3432 3-3 3-1.6569 0-3.00004-1.3431-3.00004-3 0-.67539.22319-1.29865.59983-1.80006M6.21426 6v4m0-4 6.00004-3 6 3-6 2-2.40021-.80006M6.21426 6l3.59983 1.19994M6.21426 19.8013v-2.1525c0-1.6825 1.27251-3.3075 2.95093-3.6488l3.04911 2.9345 3-2.9441c1.7026.3193 3 1.9596 3 3.6584v2.1525c0 .6312-.5373 1.1429-1.2 1.1429H7.41426c-.66274 0-1.2-.5117-1.2-1.1429Z" />
    </svg>
  );
};

function classDetails(rank) {
  const divSize = rank === 1 ? "large" : "small";

  return {
    mainClass: `relative flex items-end justify-center ${
      divSize === "small" ? "w-48 h-68" : "w-64 h-68"
    }`,
    topCircleClass: `absolute rounded-full bg-color-bg transition-shadow duration-300 ease-in-out z-1 border-2 ${
      divSize === "small" ? "top-0 w-36 h-36" : "-top-14 w-40 h-40"
    } ${RANK_ACCENT_COLOR_CLASSES[rank]} bg-color-bg
    }`,
    studentIcon: <StudentIcon iconSize={divSize} userRank={rank} />,
    midSqureClass: `${
      divSize === "small" ? "top-31 w-8 h-8" : "top-20 w-10 h-10"
    } bg-${
      ACCENT_COLOR_CLASSES[rank]
    } absolute rounded-lg rotate-45 flex justify-center items-center z-2`,
    rankNumberClass: `block -rotate-45 font-bold text-color-text-dark select-none font-googlesanscode ${
      divSize === "small" ? "text-xl" : "text-2xl"
    }`,
    userDetailsClass: `absolute bottom-0 flex flex-col justify-end items-center select-none ${
      divSize === "small"
        ? "w-48 h-48 bg-color-bg-1 pb-6"
        : "w-64 h-64 bg-color-bg-2 pb-8"
    } ${DIV_ROUNDED_CLASSES[rank]}`,
    userPercentageClass: `font-googlesanscode font-bold ${
      divSize === "small" ? "text-3xl" : "text-4xl"
    } text-${ACCENT_COLOR_CLASSES[rank]}`,
    userFullNameClass:
      "text-xl font-normal transition-all duration-300 ease-in-out text-color-text-light",
    userNameClass: "text-color-text-light text-sm font-thin",
  };
}

function PodiumUser({
  rank,
  percentage = 0,
  name = "N/A",
  userName = "N/A",
  cssDetails,
}) {
  const [hoverdDiv, setHoverdDiv] = useState(null);
  const isHoverd = hoverdDiv === rank;

  return (
    <div id={rank} className={`${cssDetails.mainClass}`}>
      <div
        onMouseEnter={() => setHoverdDiv(rank)}
        onMouseLeave={() => setHoverdDiv(null)}
        className={`${cssDetails.topCircleClass} ${
          isHoverd ? "shadow-2xl" : "shadow-lg"
        }`}
      >
        {cssDetails.studentIcon}
      </div>
      <div
        onMouseEnter={() => setHoverdDiv(rank)}
        onMouseLeave={() => setHoverdDiv(null)}
        className={`${cssDetails.midSqureClass}`}
      >
        <span className={cssDetails.rankNumberClass}>
          {<CountUp end={rank} />}
        </span>
      </div>
      <div
        onMouseEnter={() => setHoverdDiv(rank)}
        onMouseLeave={() => setHoverdDiv(null)}
        className={cssDetails.userDetailsClass}
      >
        <p className={`${cssDetails.userPercentageClass}`}>
          <CountUp end={percentage} />
          <span className="text-sm font-inter font-thin">%</span>
        </p>
        <p className={cssDetails.userFullNameClass}>{name}</p>
        <p className={cssDetails.userNameClass}>{userName}</p>
      </div>
    </div>
  );
}
