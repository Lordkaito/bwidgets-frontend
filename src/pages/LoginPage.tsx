import Navbar from "@/components/Navbar";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json().then((data) => {
      setToken(data.token);
      if (res.status === 200) {
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    }));
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
