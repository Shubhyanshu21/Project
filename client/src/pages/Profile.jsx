import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


export default function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      // get profile
      const userRes = await axios.get(
        "http://localhost:8000/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(userRes.data);

      // get posts
      const postRes = await axios.get(
        "http://localhost:8000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // filter only user's posts
      const myPosts = postRes.data.filter(
        (p) => p.user._id === userRes.data._id
      );

      setPosts(myPosts);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) return <p className="text-white">Loading...</p>;

  return (
    <>
    <Navbar />

    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold">
          {user.username}
        </h1>
        <p className="text-gray-400">{user.email}</p>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded mt-3"
        >
          Logout
        </button>

        <h2 className="text-xl mt-6 mb-4">My Posts</h2>

        <div className="grid grid-cols-2 gap-4">
          {posts.map((post) => (
            <img
              key={post._id}
              src={post.image}
              alt="post"
              className="rounded"
            />
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
