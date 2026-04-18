import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const [state, setState] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });

      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
        toast.success("Success");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="sm:w-96 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

        {/* Name field (only signup) */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent text-white outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent text-white outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full pl-6 gap-2">
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent text-white outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-400 text-sm mt-4 mb-8 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-indigo-400 ml-1">Click here</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
