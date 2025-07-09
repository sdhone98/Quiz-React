import React from "react";
import ResultTable from "../../components/ResultTable";
import { useNavigate
} from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-screen h-full flex-col bg-color-background py-8 px-20 ">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-color-text-1">
          QuickQuiz - Teacher Dashboard
        </h1>
        <p className="max-w-2xl font-light text-color-text-1 md:text-lg lg:text-xl">
          Logged in as: <span className="font-bold">Mr. Sagar Dhone</span>
        </p>
      </div>
      <div className="w-full h-fit flex justify-between items-center">
        <div className="max-w-2xl h-1/2">
          <div
            class="p-4 rounded-lg md:p-8 bg-color-button-3"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto sm:grid-cols-2 xl:grid-cols-3 text-color-text-1 sm:p-8">
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">73M+</dt>
                <dd class="text-color-accent-1 text-center">
                  Total Quizzes Created
                </dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">100M+</dt>
                <dd class="text-color-accent-1 text-center">Active Quizzes</dd>
              </div>
              <div class="flex flex-col items-center justify-center">
                <dt class="mb-2 text-3xl font-extrabold">1000s</dt>
                <dd class="text-color-accent-1 text-center">
                  Total Students Participated
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <ResultTable />
      </div>
      <div className="max-w-xl">
        <a
        onClick={() => navigate("/teacher/quiz/create/")}
              
              className={`cursor-pointer w-2/6 inline-flex items-center justify-center px-5 py-3  text-base font-medium text-center text-color-text-2 bg-color-button-1 rounded-lg hover:bg-color-accent-1`}
            >
              Create New Quiz
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
            </a>
      </div>
    </section>
  );
};

export default TeacherDashboard;
