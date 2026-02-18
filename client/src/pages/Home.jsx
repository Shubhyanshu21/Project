import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8000/api/posts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Home Feed
      </h1>
      <button
    onClick={() => navigate("/create")}
    className="bg-blue-500 px-4 py-2 rounded mb-4">
        Create Post
</button>


      <div className="max-w-xl mx-auto space-y-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-gray-800 rounded-lg p-4"
          >
            <h2 className="font-semibold">
              {post.user.username}
            </h2>
            <button
            className="text-blue-400 text-sm"
            onClick={async () => {
             const token = localStorage.getItem("token");
             await axios.put(
           `http://localhost:8000/api/users/follow/${post.user._id}`,
           {},
           {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
         );
         alert("Follow status changed");
         }     }
        >
         Follow
        </button>

            <img
              src={post.image}
              alt="post"
              className="w-full mt-2 rounded"
            />

            <p className="mt-2">{post.caption}</p>

            <p className="text-sm text-gray-400 mt-1">
              {post.likes.length} likes
            </p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
