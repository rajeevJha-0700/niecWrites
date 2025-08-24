import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../Container.jsx";
import Logout from "../Logout.jsx";
import { Menu, X } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const authStatus = useSelector((state) => state.authorization.status);
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Home", path: "/", presentOrNot: true },
    { name: "Login", path: "/login", presentOrNot: !authStatus },
    { name: "Signup", path: "/signup", presentOrNot: !authStatus },
    { name: "All Posts", path: "/all-posts", presentOrNot: authStatus },
    { name: "Add Post", path: "/add-post", presentOrNot: authStatus },
    { name: "Dashboard", path: "/dashboard", presentOrNot: authStatus },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <Container className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <div
            className="text-3xl font-extrabold tracking-tight cursor-pointer bg-gradient-to-r from-black via-blue-400 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
            onClick={() => navigate("/")}
          >
            niec<span className="text-blue-700 font-serif">Writes</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navigationItems.map(
                (item) =>
                  item.presentOrNot && (
                    <li key={item.name}>
                      <button
                        className="relative text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 group"
                        onClick={() => navigate(item.path)}
                      >
                        {item.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                      </button>
                    </li>
                  )
              )}
            </ul>

            {authStatus && (
              <div className="ml-6 border-l border-gray-300 pl-6">
                <Logout />
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="w-7 h-7 text-gray-800" />
              ) : (
                <Menu className="w-7 h-7 text-gray-800" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 pt-4 pb-6">
            <ul className="flex flex-col space-y-3 px-4">
              {navigationItems.map(
                (item) =>
                  item.presentOrNot && (
                    <li key={item.name}>
                      <button
                        className="block w-full text-left px-4 py-3 text-lg font-semibold text-gray-800 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                        onClick={() => {
                          navigate(item.path);
                          setIsOpen(false);
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
            </ul>

            {authStatus && (
              <div className="mt-4 px-4">
                <Logout />
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;