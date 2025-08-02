import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import NavBar from "../components/NavBar";
import StudentDashboard from "../pages/student/StudentDashboard";
import StartQuiz from "../pages/student/StartQuiz";
import StudentResult from "../pages/student/StudentResult";
import { useEffect } from "react";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import CreateQuiz from "../pages/teacher/CreateQuiz";
import AddQuestions from "../pages/teacher/AddQuestions";
import AllQuizzes from "../pages/teacher/AllQuizzes";
import QuizListing from "../pages/student/QuizListing";
import ContactUs from "../components/ContactUs";
import { ROUTES } from "../constants/routes";
import LeaderBoard from "../components/LeaderBoard";
import ResultSummery from "../components/ResultSummery";

const AttemptQuiz = () => <div className="p-6">Attempt Quiz Page</div>;

// General Pages
const NotFound = () => (
  <div className="p-6 text-center">404 - Page Not Found</div>
);

const AppLayout = ({ children }) => {
  const navigate = useNavigate(null);

  useEffect(() => {
    navigate(ROUTES.LOGIN);
  }, []);

  const location = useLocation();
  const hideNavbar = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    ROUTES.STUDENT_START_QUIZ,
  ].includes(location.pathname.toLowerCase());

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {!hideNavbar && <NavBar />}
      <div className={hideNavbar ? "flex-1" : "flex-1 overflow-auto"}>
        {children}
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/quiz/listing" element={<QuizListing />} />
          <Route path="/student/quiz/start" element={<StartQuiz />} />
          <Route path="/student/quiz/:quizId" element={<AttemptQuiz />} />
          <Route path="/student/result" element={<StudentResult />} />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/quiz" element={<AllQuizzes />} />
          <Route
            path="/teacher/quiz/questions-add"
            element={<AddQuestions />}
          />
          <Route path="/teacher/quiz/create" element={<CreateQuiz />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default AppRoutes;
