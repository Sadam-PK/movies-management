import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

// import AppBar from "./components/Appbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";
import Appbar from "./components/Appbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie-details" element={<MovieDetails />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
