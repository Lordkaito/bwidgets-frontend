import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const baseUrl = "https://bwidgets-server-6u3u-dev.fl0.io/user";
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    }).then((res) => {
      if (res.status === 201) {
        navigate("/", { state: { isLoggedIn: true } });
      } else {
        alert("SignUp failed");
      }
    });
  };
  return (
    <>
      <Navbar />
      <h1>Login Page</h1>
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <label htmlFor="username">
            <input
              type="text"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
