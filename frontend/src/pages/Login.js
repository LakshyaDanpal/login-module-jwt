import React, { useState } from "react";
import "../styles/Login.css"; // make sure path is correct

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("✅ Login successful");
        setToken(data.token);
        localStorage.setItem("token", data.token);
      } else {
        setMessage("❌ Invalid credentials");
        setToken("");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("⚠️ Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {message && <p className="msg">{message}</p>}

        {token && (
          <div className="token-box">
            <h4>JWT Token:</h4>
            <textarea readOnly value={token} />
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
