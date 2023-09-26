import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import SignUpPage from "@pages/SignupPage";
import FoldersPage from "./pages/FoldersPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/folders/:id" element={<FoldersPage />} />
          <Route path="/logout" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
