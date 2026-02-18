import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 p-4 flex justify-between text-white">
      <h1
        className="font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        GenZGram
      </h1>

      <div className="space-x-4">
        <button onClick={() => navigate("/create")}>
          Create
        </button>
        <button onClick={() => navigate("/profile")}>
          Profile
        </button>
      </div>
    </div>
  );
}
