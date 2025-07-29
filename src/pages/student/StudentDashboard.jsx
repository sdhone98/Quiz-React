import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BASE_URL_END_POINT,
  API_END_POINTS,
} from "../../constants/apiEndPoints";
import CustomBtn from "../../components/CustomBtn";
import TopicHeroSection from "../../components/TopicHeroSection";

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

  const msgLine =
    "Ready to challenge yourself and grow your skills? Pick a topic and show us what you've got!";

  return (
    <section className="w-screen max-w-screen h-full flex justify-start items-center bg-color-bg">
      <div className="w-full p-2 mx-48 h-1/2 flex items-center">
        <div className="w-1/2">
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
        <div className="w-1/2 h-1/1">{<TopicHeroSection />}</div>
      </div>
    </section>
  );
};

export default StudentDashboard;
