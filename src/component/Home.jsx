import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import database from "../Service/DatabaseService.js";
import { Container, PostCard } from "./Warehouse.js";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    database.getAllPost().then((res) => {
      if (res?.documents) {
        const limited = res.documents.slice(0, 6);
        setPosts(limited);
      }
      setLoading(false);
    });
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Empty State
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <Container className="max-w-2xl text-center py-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            No stories yet.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Be the first to write something worth reading.
          </p>
          <Link
            to="/add-post"
            className="inline-block border border-black px-6 py-3 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition"
          >
            Write a Story
          </Link>
        </Container>
      </div>
    );
  }

  // Home Grid
  return (
    <div className="min-h-screen bg-white">
      <Container className="max-w-6xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black leading-tight">
            Hypes of the Weekend
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Fresh ideas, every week
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.$id} className="border-b border-gray-200 pb-8 last:border-0">
              <PostCard {...post} />
            </article>
          ))}
        </div>

        {/* See All */}
        <div className="mt-16 text-center">
          <Link
            to="/all-posts"
            className="text-sm uppercase tracking-wider border-b border-black pb-1 hover:text-gray-600"
          >
            See all stories →
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default Home;