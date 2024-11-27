import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
        navigate("/signin");
      }}
    >
      Log out
    </button>
  );
}
