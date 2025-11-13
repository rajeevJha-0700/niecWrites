import { useNavigate } from 'react-router-dom';
import logo from "../../src/assets/sembuzz-logo.jpg"; // Correct path

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="text-center space-y-8 max-w-4xl animate-fadeIn">

        {/* === BIG LOGO (Image) === */}
        <div className="flex justify-center mb-8">
          <img 
            src={logo} 
            alt="Sembuzz Logo" 
            className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain rounded-full shadow-2xl border-4 border-white hover:scale-110 transition-transform duration-300"
          />
        </div>

  
        {/* 404 Text */}
        <h1 className="text-9xl sm:text-10xl md:text-[12rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-red-500 to-purple-900 tracking-tighter animate-pulse">
          404
        </h1>

        {/* Message */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 font-medium">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-base sm:text-lg text-gray-500 max-w-md mx-auto">
          It might have been moved, deleted, or you may have mistyped the URL.
        </p>

        {/* Back to Home Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out transform"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-10 0a1 1 0 01-1-1v-3a1 1 0 011-1h3a1 1 0 011 1v3" />
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;