import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) =>
      res.json().then((data) => {
        if (res.status === 202) {
          Cookies.set("token", data.token, { expires: 2 });
          navigate("/", { state: { isLoggedIn: true } });
        } else {
          alert("Login failed");
        }
      })
    );
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
          <label htmlFor="password">
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
