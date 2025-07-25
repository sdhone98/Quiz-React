import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import { useToast } from "../context/ToastContext";
import { setUser } from "../redux/userSlice";
import { useLoading } from "../context/LoadingContext";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();

  const [defaultUserRole, setDefaultUserRole] = useState("Student");
  const handleRegister = async (e) => {
    e.preventDefault();

    
    // VALIDATION 
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
    <section className="bg-color-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-color-button-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-color-text-1">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div className="flex gap-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-color-text-1"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="text-color-text-1 text-sm rounded-lg block w-full p-2.5 bg-color-background"
                    placeholder="Devid"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-color-text-1"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="text-color-text-1 text-sm rounded-lg block w-full p-2.5 bg-color-background"
                    placeholder="Paul"
                    required=""
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-color-text-1"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="text-color-text-1 text-sm rounded-lg block w-full p-2.5 bg-color-background"
                  placeholder="devidp@hotmail.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-color-text-1"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="text-color-text-1 text-sm rounded-lg block w-full p-2.5 bg-color-background"
                  placeholder="Devid@01"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-color-text-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="text-color-text-1 text-sm rounded-lg block w-full p-2.5 bg-color-background"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-color-text-1"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="text-color-text-1 text-sm rounded-lg block w-full p-2.5 bg-color-background"
                  required=""
                />
              </div>
              <button
                type="submit"
                className="w-full text-color-text-2 bg-color-accent-1 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-color-text-1 text-center">
                Already have an account?{" "}
                <a
                  onClick={() => navigate("/login")}
                  className="font-medium text-color-accent-1 hover:underline hover:cursor-pointer"
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
