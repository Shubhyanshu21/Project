import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8000/api/auth/signup",
      form
    );

    alert("Signup successful");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="bg-gray-800 p-8 rounded-lg w-80"
      >
        <h2 className="text-white text-2xl mb-4">Signup</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="w-full bg-green-500 p-2 rounded text-white">
          Signup
        </button>
      </form>
    </div>
  );
}
