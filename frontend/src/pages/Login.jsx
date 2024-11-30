import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../components/CustomButton";
import axios from "axios";
import UserContext from "../context/UserContext";
import { toast } from "react-toastify";
import apiBaseUrl from '../config.js'


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ------ context api -----

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if email and password are provided
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }
  
    try {
      // Step 1: Send login request with email and password
      const response = await axios.post(
        `${apiBaseUrl}/api/auth/login`, // Your backend URL
        { email, password }, // User credentials
      );
  
      // Step 2: Get the token from the response
      const { token, message } = response.data;
  
      // If token received, proceed with storing it and fetching user info
      if (token) {
        localStorage.setItem("token", token); // Save token in localStorage
        toast.success(message || "Login successful!"); // Show success toast
  
        // Step 3: Fetch user data using the token
        const userResponse = await axios.get(
          
          `${apiBaseUrl}/api/auth/me`, // Your backend URL to get user info
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Send token in Authorization header
            },
          }
        );
  
        // Step 4: Set the user data in context or state
        setUser(userResponse.data.user); // Save user data in state/context
        navigate("/"); // Navigate to home page after successful login
      } else {
        toast.error("Token not received. Please try again.");
      }
    } catch (error) {
      console.error(error); // Log error to console
  
      // Show specific error message if available, else general error
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };
  

  useEffect(() => {
    if (user && localStorage.getItem("token")) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div
      className="flex flex-col w-auto h-screen p-3 gap-3 
      justify-center items-center mx-auto bg-zinc-300"
    >
      <div
        className="bg-white px-6 py-10 flex flex-col items-center gap-2 justify-center
      rounded-md"
      >
        <FontAwesomeIcon icon={faUser} size="4x" color="gray" />
        <h2 className="font-bold text-xl py-2 text-gray-600">Login Here!</h2>

        <CustomInput
          icon={
            <FontAwesomeIcon icon={faUser} className="text-gray-700 mr-3" />
          }
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <CustomInput
          icon={
            <FontAwesomeIcon icon={faLock} className="text-gray-700 mr-3" />
          }
          placeholder="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <CustomButton
          name="Login"
          className="bg-indigo-900 p-2 border-2 border-indigo-900 rounded-full w-32 text-white
        hover:bg-transparent hover:border-indigo-400 hover:border-2
        hover:text-indigo-600"
          onClick={handleSubmit}
        />

        <div className="p-5">
          <p className="text-gray-500 text-sm sm:text-base">
            Dont have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 hover:text-blue-500 
          transition duration-300"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
