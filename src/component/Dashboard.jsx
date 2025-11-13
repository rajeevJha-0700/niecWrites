import { useSelector } from "react-redux";
import MyPost from "./MyPost";
import {Link} from "react-router-dom"

function Dashboard() {
  const myData = useSelector((state) => state.authorization.userData);

  const verificationStatus = myData.emailVerification
    ? "Verified"
    : "Untrusted Source";

  const dateStr = myData.registration;
  const date = new Date(dateStr);
  const joinedSince = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
           {myData.name} 
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
                <p className="text-lg font-semibold text-gray-800">{myData.name}</p>
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div>
                <span className="text-sm font-medium text-gray-500">Email</span>
                <p className="text-lg font-semibold text-gray-800">{myData.email}</p>
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div>
                <span className="text-sm font-medium text-gray-500">Joined Since</span>
                <p className="text-lg font-semibold text-gray-800">{joinedSince}</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                className={`h-6 w-6 ${myData.emailVerification ? 'text-green-600' : 'text-red-600'} mr-2`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={myData.emailVerification
                    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"}
                />
              </svg>
              <div>
                <span className="text-sm font-medium text-gray-500">Verification Status</span>
                <p className={`text-lg font-semibold ${myData.emailVerification ? 'text-green-600' : 'text-red-600'}`}>
                  {verificationStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            My Logs
          </h2>
          <hr className="border-gray-200 mb-6" />
          <MyPost className="space-y-6" />
           <Link
            to="/add-post"
            className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Post
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;