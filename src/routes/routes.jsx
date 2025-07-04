import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import NavBar from "../components/NavBar";
import StudentDashboard from "../pages/student/StudentDashboard";
import StartQuiz from "../pages/student/StartQuiz";

// Student Pages
// const StudentDashboard = () => <div className="p-6">Student Dashboard</div>;
// const StartQuiz = () => <div className="p-6">Start Quiz Page</div>;
const AttemptQuiz = () => <div className="p-6">Attempt Quiz Page</div>;
const ResultPage = () => <div className="p-6">Result Page</div>;

// Teacher Pages
const TeacherDashboard = () => <div className="p-6">Teacher Dashboard</div>;
const CreateQuiz = () => <div className="p-6">Create Quiz Page</div>;
const ManageQuiz = () => <div className="p-6">Manage Quiz Page</div>;

// General Pages
const Home = () => <div className="p-6">Home Page</div>;
const NotFound = () => (
  <div className="p-6 text-center">404 - Page Not Found</div>
);

const AppLayout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = [
    "/login", 
    "/register", 
    // "/"
].includes(
    location.pathname.toLowerCase()
  );

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
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/quiz/start" element={<StartQuiz />} />
          <Route path="/student/quiz/:quizId" element={<AttemptQuiz />} />
          <Route path="/student/result/:quizId" element={<ResultPage />} />

          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/quiz/create" element={<CreateQuiz />} />
          <Route path="/teacher/quiz/manage" element={<ManageQuiz />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default AppRoutes;
