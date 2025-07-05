import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setTopics, setDifficulties } from "../redux/topicSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadLanguages = async () => {
      const { success, data, error } = await apiRequest({
        url: "http://localhost:8000/api/topic",
        method: "GET",
        params: { flat: true },
      });

      if (success) {
        dispatch(setTopics({ data }));
      } else {
        console.error("Error loading languages:", error);
      }

      setLoading(false);
    };

    const loadDifficulty = async () => {
      const { success, data, error } = await apiRequest({
        url: "http://localhost:8000/api/topic/difficulty",
        method: "GET",
      });

      if (success) {
        dispatch(setDifficulties({ data }));
      } else {
        console.error("-- Error loading languages:", error);
      }

      setLoading(false);
    };

    loadLanguages();
    loadDifficulty();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    navigate("/student/dashboard");
    const user = {
      userName: "sdhone98",
      name: "Sagar Dhone",
      firstName: "Sagar",
      lastName: "Dhone",
      role: "student",
    };

    const token = {
      id: "sdhone98",
    };

    dispatch(setUser({ user, token }));

    if (user.role === "student") return navigate("/student/dashboard");
    if (user.role === "teacher") return navigate("/teacher/dashboard");
    navigate("/");
  };
  return (
    <div className="h-screen max-h-full max-w mx-auto flex items-center justify-center bg-color-background">
      <form className="max-w-sm mx-auto" onSubmit={handleLogin}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-color-text-1"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-color- border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@domain.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-color-text-2 bg-color-button-1 focus:ring-2 focus:outline-none focus:ring-color-accent-2 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
