import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [defaultUserRole, setDefaultUserRole] = useState("student");
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log("REG", e.target.username.value);
    // setErrorMsg("");
    const userDetails = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      role: defaultUserRole,
      first_name: e.target.firstName.value,
      last_name: e.target.lastName.value,
    };

    console.log("REGISTER DETASILS ======> ", userDetails);
  };
  const navigate = useNavigate(null);
  return (
    <section className="bg-color-background">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-color-button-3">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                <p
                  className={`${
                    true ? "" : "hidden"
                  } mt-2 text-sm text-red-600 dark:text-red-500`}
                >
                  <span class="font-medium">Oh, snapp!</span> username already
                  used.!.
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  name="confirm-password"
                  id="confirm-password"
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
