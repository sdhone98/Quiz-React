import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Button, Label, TextInput, Select, Card } from 'flowbite-react';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    console.log("CLICk", email, password);
    e.preventDefault();
    setErrorMsg("");
    navigate("/student/dashboard");


    // try {
    //   const res = await axios.post("http://localhost:8000/api/users/login", {
    //     email,
    //     password,
    //     role,
    //   });

    //   const { token, user } = res.data.data;

    //   // Store user and token (localStorage/sessionStorage or context)
    //   localStorage.setItem("token", token);
    //   localStorage.setItem("user", JSON.stringify(user));

    //   localStorage.getItem("token");

    //   navigate("/student/dashboard");

    // //   // Redirect based on role
    // //   if (user.role === "student") {
    // //     navigate("/student/dashboard");
    // //   } else {
    // //     navigate("/teacher/dashboard");
    // //   }
    // } catch (err) {
    //   setErrorMsg(
    //     err.response?.data?.message || "Login failed. Please try again."
    //   );
    // }
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
