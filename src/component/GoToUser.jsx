import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import database from "../Service/DatabaseService";
import { Container,PostCard } from "./Warehouse.js";


function GoToUser() {
  const [posts, setPosts] = useState([]);
  const [verified, setVerified] = useState(false);
  const [name, setName] = useState("raj-0700");
  const { slug } = useParams();

  useEffect(() => {
    database.getAllPost_user(slug).then((posts) => {
      if (posts && posts.documents.length > 0) {
        console.log(posts.documents)
        setPosts(posts.documents);
        setName(posts.documents[0].username);
        setVerified(posts.documents[posts.documents.length - 1].verified);
      } else {
        console.log("No posts found for this user...");
      }
    }).catch((error) => {
      console.error("Error fetching user posts:", error);
    });
  }, [slug]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 py-12 sm:py-16">
      <Container className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
            Posts by {name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <div>
                <span className="text-sm font-medium text-gray-500">Name</span>
                <p className="text-lg font-semibold text-gray-800">{name}</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-blue-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <span className="text-sm font-medium text-gray-500">Number of Posts</span>
                <p className="text-lg font-semibold text-gray-800">{posts.length}</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                className={`h-6 w-6 ${verified ? 'text-green-600' : 'text-red-600'} mr-2`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={verified
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"}
                />
              </svg>
              <div>
                <span className="text-sm font-medium text-gray-500">Verification Status</span>
                <p className={`text-lg font-semibold ${verified ? 'text-green-600' : 'text-red-600'}`}>
                  {verified ? "Verified" : "Unverified"}
                </p>
              </div>
            </div>
          </div>
        </div>

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

export default GoToUser;