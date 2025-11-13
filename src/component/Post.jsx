// Post.jsx - MEDIUM CLONE (Black & White) - BUTTONS FIXED
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import database from "../Service/DatabaseService.js";
import { Container } from "./Warehouse.js";
import parse from "html-react-parser";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authorization.userData);
  const isAuthor = post && userData ? post.userID === userData.$id : false;

  useEffect(() => {
    if (!slug) return navigate("/");
    database.getPost(slug).then((p) => (p ? setPost(p) : navigate("/")));
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!window.confirm("Delete this story?")) return;
    try {
      await database.deletePost(post.$id);
      if (post.featuredImage) await database.deleteFile(post.featuredImage);
      navigate("/");
    } catch {
      alert("Failed to delete.");
    }
  };

  if (!post) return null;

  const date = new Date(post.$createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-white text-black font-serif">
      <Container className="max-w-3xl mx-auto pt-16 pb-32 px-4 sm:px-6 lg:px-8">

        {/* TITLE */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            {date}
          </p>
        </header>

        {/* IMAGE */}
        {post.featuredImage && (
          <div className="mb-16 -mx-4 md:mx-0">
            <img
              src={database.fileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>
        )}

        {/* CONTENT */}
        <article className="prose prose-lg max-w-none mb-16">
          <div className="text-black leading-relaxed text-lg space-y-8 font-light">
            {parse(post.content)}
          </div>
        </article>

        {/* === AUTHOR BUTTONS - NOW AT THE END === */}
        {isAuthor && (
          <div className="flex justify-center gap-4 border-t border-gray-200 pt-8">
            <Link to={`/edit-post/${post.$id}`}>
              <button className="text-sm uppercase tracking-wider border border-black px-6 py-2 hover:bg-black hover:text-white transition">
                Edit Story
              </button>
            </Link>
            <button
              onClick={deletePost}
              className="text-sm uppercase tracking-wider border border-black px-6 py-2 hover:bg-black hover:text-white transition text-red-600"
            >
              Delete Story
            </button>
          </div>
        )}

        {
          !isAuthor && (
             <Link to={`/users/${post.userID}`}>
              <button className="text-sm uppercase tracking-wider border border-black px-6 py-2 hover:bg-black hover:text-white transition">
                about the author
              </button>
            </Link>
          )
        }

        {/* BACK LINK */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate(-1)}
            className="text-sm uppercase tracking-wider border-b border-black pb-1 hover:text-gray-600"
          >
            ← All Stories
          </button>
        </div>
      </Container>
    </div>
  );
}