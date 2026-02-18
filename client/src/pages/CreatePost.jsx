import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      // Step 1: upload image
      const formData = new FormData();
      formData.append("image", image);

      const uploadRes = await axios.post(
        "http://localhost:8000/api/upload",
        formData
      );

      const imageUrl = uploadRes.data.imageUrl;

      // Step 2: create post
      await axios.post(
        "http://localhost:8000/api/posts",
        { image: imageUrl, caption },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post created");
      navigate("/home");
    } catch (error) {
      alert("Error creating post");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded w-80"
      >
        <h2 className="text-white text-xl mb-4">Create Post</h2>

        <input
          type="file"
          className="w-full mb-3 text-white"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <input
          type="text"
          placeholder="Caption"
          className="w-full p-2 mb-3 rounded"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button className="w-full bg-blue-500 p-2 rounded text-white">
          Post
        </button>
      </form>
    </div>
  );
}
