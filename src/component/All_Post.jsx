import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import database from "../Service/DatabaseService.js";
import { Container, Button, PostCard } from "./Warehouse.js";


function All_Post() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    database.getAllPost().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      } else {
        console.log("No posts found or maybe you're not logged in...");
      }
      setLoading(false);
    });
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  // Empty State
  if (posts.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-20">
        <Container className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white rounded-xl shadow-lg p-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-gray-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 19V6a2 2 0 012-2h3l2-2h4l2 2h3a2 2 0 012 2v13a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              No Posts Yet!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Be the first to share your thoughts and inspire others ✍️
            </p>
            <Link to="/add-post">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
                Create Your First Post
              </Button>
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Posts Grid
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16">
      <Container className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-green-500 via-pink-500 to-red-600 bg-clip-text text-transparent mb-6 drop-shadow-md">
            latest in your feed
          </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="w-full transform transition duration-300 hover:-translate-y-2"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default All_Post;