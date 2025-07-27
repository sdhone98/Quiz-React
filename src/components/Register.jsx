import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { useToast } from "../context/ToastContext";
import { setUser } from "../redux/userSlice";
import { useLoading } from "../context/LoadingContext";
import CustomBtn from "./CustomBtn";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();

  const [defaultUserRole, setDefaultUserRole] = useState("Student");
  const handleRegister = async (e) => {
    e.preventDefault();

    // VALIDATION 
    if (e.target.username.value === null) return showToast("Warning", "Warning", "Username required.!");
    if (e.target.password.value != e.target.confirmPassword.value) return showToast("Warning", "Warning", "Password and confirm password do not match.");
    setIsLoading(true);
    const { success, data, error } = await apiRequest({
      url: "http://localhost:8000/api/users/",
      method: "POST",
      data: {
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value,
        role: defaultUserRole,
        first_name: e.target.firstName.value,
        last_name: e.target.lastName.value,
      },
    });

    setIsLoading(false);

    if (success) {
      showToast("Success", "Info", "User Register Sucessfully.!");
      setUser(defaultUserRole);
      navigate("/login");
    } else {
      showToast("Error", "Error", JSON.stringify(error.data));
    }
  };
  return (
    <section className="bg-color-bg">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-color-bg-1">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-color-text">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div className="flex gap-2">
                <div className="w-full">
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-color-text"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="text-color-text text-sm rounded-lg block w-full p-2.5 bg-color-bg-2"
                    placeholder="Devid"
                    required
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-color-text"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="text-color-text text-sm rounded-lg block w-full p-2.5 bg-color-bg-2"
                    placeholder="Paul"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-color-text"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="text-color-text text-sm rounded-lg block w-full p-2.5 bg-color-bg-2"
                  placeholder="devidp@hotmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-color-text"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="text-color-text text-sm rounded-lg block w-full p-2.5 bg-color-bg-2"
                  placeholder="Devid@01"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-color-text"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="text-color-text text-sm rounded-lg block w-full p-2.5 bg-color-bg-2"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-color-text"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="text-color-text text-sm rounded-lg block w-full p-2.5 bg-color-bg-2"
                  required
                />
              </div>
              <CustomBtn
              label={"Create an account"}
              />
              <p className="text-sm font-light text-color-text text-center">
                Already have an account?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="font-medium text-color-btn hover:underline hover:cursor-pointer"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
