import CustomInput from "../components/CustomInput";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../components/CustomButton";

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => setName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleRadioChange = (event) => setRole(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex flex-col w-auto h-screen p-3 gap-3 
      justify-center items-center mx-auto bg-zinc-300"
    >
      <div
        className="bg-white p-6 flex flex-col items-center gap-2 justify-center
      rounded-md"
      >
        <FontAwesomeIcon icon={faUser} size="4x" color="gray" />
        <h2 className="font-bold text-xl py-2 text-gray-600">Sign Up Here!</h2>
        <CustomInput
          icon={
            <FontAwesomeIcon icon={faUser} className="text-gray-700 mr-3" />
          }
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
        <CustomInput
          icon={
            <FontAwesomeIcon icon={faUser} className="text-gray-700 mr-3" />
          }
          placeholder="Email"
          value={username}
          onChange={handleUsernameChange}
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
          name="Register"
          className="bg-indigo-900 p-2 border-2 border-indigo-900 rounded-full w-32 text-white
        hover:bg-transparent hover:border-indigo-400 hover:border-2
        hover:text-indigo-600"
          onClick={handleSubmit}
        />

        <div className="p-5">
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-700 hover:text-blue-500 
          transition duration-300"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
