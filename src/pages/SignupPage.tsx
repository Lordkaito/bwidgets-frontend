import Navbar from "@/components/Navbar";
import { useState } from "react";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, email }),
    }).then((res) => {
      console.log(res)
      if (res.status === 200) {
        alert("SignUp successful");
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