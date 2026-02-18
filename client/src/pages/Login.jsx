import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      { email, password }
      
    );
    localStorage.setItem("token", res.data.token);
    navigate("/home");

    localStorage.setItem("token", res.data.token);
    alert("Login successful");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg w-80"
      >
        <h2 className="text-white text-2xl mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 p-2 rounded text-white">
          Login
        </button>
      </form>
      <p className="text-gray-400 text-sm mt-4 text-center">
         Don’t have an account?{" "}
     <span
       className="text-blue-400 cursor-pointer"
       onClick={() => navigate("/signup")}
      >
       Signup
     </span>
</p>

    </div>
  );
}
