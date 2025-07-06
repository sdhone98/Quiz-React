import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setTopics, setDifficulties } from "../redux/topicSlice";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { showToast } = useToast();
  const [userRole, setUserRole] = useState("student");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        showToast("Error", "Error", JSON.stringify(error.data));
      }
    };

    const loadDifficulty = async () => {
      const { success, data, error } = await apiRequest({
        url: "http://localhost:8000/api/topic/difficulty",
        method: "GET",
      });

      if (success) {
        dispatch(setDifficulties({ data }));
      } else {
        showToast("Error", "Error", JSON.stringify(error.data));
      }
    };

    loadLanguages();
    loadDifficulty();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { success, data, error } = await apiRequest({
      url: "http://localhost:8000/api/users/login",
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    });
    setIsLoading(false);
    if (success) {
      let user = {
        userId: data.id,
        userName: data.username,
        name: data.name,
        firstName: data.first_name,
        lastName: data.last_name,
        role: data.user_type,
      };
      dispatch(setUser({ user }));
      setUserRole(data.user_type);
      if (userRole === "student") return navigate("/student/dashboard");
      if (userRole === "teacher") return navigate("/teacher/dashboard");
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }

    // const user = {
    //   userId: 1,
    //   userName: "sdhone98",
    //   name: "Sagar Dhone",
    //   firstName: "Sagar",
    //   lastName: "Dhone",
    //   role: "student",
    // };

    // dispatch(setUser({ user }));
    // setUserRole(user.role);

    // if (userRole === "student") return navigate("/student/dashboard");
    // if (userRole === "teacher") return navigate("/teacher/dashboard");
    // navigate("/");
  };
  return (
    <div className="w-screen h-full px-12 py-8 flex flex-col items-center bg-color-background lg:pt-40">
      <div className="text-color-text-1 flex-row justify-center text-center mb-10">
        <h1 className="w-full text-5xl mb-2 font-extrabold text-color-button-1">
          <small className="ms-2 font-semibold text-color-text-1">
            Welcome Back to{" "}
          </small>
          QuickQuiz
        </h1>
        <p className="text-lg font-normal text-color-text-1 lg:text-xl">
          Please login to your account
        </p>
      </div>
      <div className="w-2/8 border-1 border-color-text-1 rounded-xl p-6 bg-color-button-3">
        <form className="w-full mx-auto" onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-color-text-1"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-sm rounded-lg block w-full p-2.5 bg-color-background placeholder-color-text-2 text-color-text-1"
              placeholder="Quiz100"
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
              className="text-sm rounded-lg block w-full p-2.5 bg-color-background placeholder-color-text-2 text-color-text-1"
              placeholder="password"
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
        <p className="text-sm font-light text-color-text-1 pt-4 text-center">
          Don't have an account yet?{" "}
          <a
            onClick={() => navigate("/register")}
            className="font-medium text-color-button-1 hover:underline hover:cursor-pointer"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
