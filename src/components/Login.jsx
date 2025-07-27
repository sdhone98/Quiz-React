import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import {
  setTopics,
  setDifficulties,
  setQuizSetsTypes,
} from "../redux/topicSlice";
import { useLoading } from "../context/LoadingContext";
import { useToast } from "../context/ToastContext";
import { CONSTANTS } from "../constants/configs";
import { ROUTES } from "../constants/routes";
import { BASE_URL_END_POINT, API_END_POINTS } from "../constants/apiEndPoints";
import { jwtDecode } from "jwt-decode";
import { setAccessToken, setRefreshToken } from "../redux/tokenSlice";
import CustomBtn from "./CustomBtn";

const BASE_URL = BASE_URL_END_POINT.BASE_URL;
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { showToast } = useToast();
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const getQuizRelatedInfo = () => {
    const loadLanguages = async () => {
      const { success, data, error } = await apiRequest({
        url: BASE_URL + API_END_POINTS.GET_TOPIC,
        method: "GET",
      });

      if (success) {
        dispatch(setTopics({ data }));
      } else {
        showToast("Error", "Error", JSON.stringify(error.data));
      }
    };

    const loadDifficulty = async () => {
      const { success, data, error } = await apiRequest({
        url: BASE_URL + API_END_POINTS.GET_TOPIC_DIFFICULTY,
        method: "GET",
      });

      if (success) {
        dispatch(setDifficulties({ data }));
      } else {
        showToast("Error", "Error", JSON.stringify(error.data));
      }
    };

    const loadSets = async () => {
      const { success, data, error } = await apiRequest({
        url: BASE_URL + API_END_POINTS.GET_TOPIC_DIFFICULTY_WITH_SET,
        method: "GET",
      });

      if (success) {
        dispatch(setQuizSetsTypes({ data }));
      } else {
        showToast("Error", "Error", JSON.stringify(error.data));
      }
    };

    loadLanguages();
    loadDifficulty();
    loadSets();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { success, data, error } = await apiRequest({
      url: BASE_URL + API_END_POINTS.LOGIN,
      method: "POST",
      data: {
        username: username,
        password: password,
      },
    });
    setIsLoading(false);
    if (success) {
      const { access, refresh } = data;
      const userDetails = jwtDecode(access);
      let user = {
        userId: userDetails.user_id,
        userName: userDetails.username,
        name: userDetails.name,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        role: userDetails.role,
        age: userDetails.age,
        contactNo: userDetails.contactNo,
        email: userDetails.email,
      };
      dispatch(setUser({ user }));
      dispatch(setAccessToken(access));
      dispatch(setRefreshToken(refresh));
      setUserRole(userDetails.role);
      getQuizRelatedInfo();
      showToast("Success", "Info", "Login sccessfully.!");
      if (userDetails.role === CONSTANTS.STUDENT)
        navigate(ROUTES.STUDENT_DASHBOARD);
      if (userDetails.role === CONSTANTS.TEACHER)
        navigate(ROUTES.TEACHER_DASHBOARD);
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };
  return (
    <div className="w-screen h-full px-12 py-8 flex flex-col items-center bg-color-bg lg:pt-40">
      <div className="text-color-text flex-row justify-center text-center mb-10">
        <h1 className="w-full text-5xl mb-2 font-extrabold text-color-btn">
          <small className="ms-2 font-semibold text-color-text">
            Welcome Back to{" "}
          </small>
          QuickQuiz
        </h1>
        <p className="text-lg font-normal text-color-text">
          Please login to your account
        </p>
      </div>
      <div className="w-2/8 rounded-xl p-6 bg-color-bg-1">
        <form className="w-full mx-auto" onSubmit={handleLogin}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-color-text"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-sm rounded-lg block w-full p-2.5 bg-color-bg-2 placeholder-color-text-light text-color-text"
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
              className="text-sm rounded-lg block w-full p-2.5 bg-color-bg-2 placeholder-color-text-light text-color-text"
              placeholder="password"
              required
            />
          </div>
          <CustomBtn label={"Submit"} />
        </form>
        <p className="text-sm font-light text-color-text pt-4 text-center">
          Don't have an account yet?{" "}
          <a
            onClick={() => navigate(ROUTES.REGISTER)}
            className="font-medium text-color-btn hover:underline hover:cursor-pointer"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
