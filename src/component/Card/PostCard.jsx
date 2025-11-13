import { Link } from "react-router-dom";
import database from "../../Service/DatabaseService.js";

function PostCard({ $id, title, featuredImage, username, userID }) {
  return (
    <div className="group">
      <Link to={`/post/${$id}`} className="block">
        {/* Image */}
        <div className="mb-4 overflow-hidden">
          <img
            src={database.fileView(featuredImage)}
            alt={title}
            className="w-full h-48 object-cover transition-opacity group-hover:opacity-90"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-black line-clamp-2 group-hover:underline">
          {title}
        </h2>
      </Link>

      {/* Author */}
      <div className="mt-3">
        <Link
          to={`/users/${userID}`}
          className="text-xs font-medium text-gray-600 uppercase tracking-wider hover:text-black transition"
        >
          {username ? `by ${username}` : "Anonymous"}
        </Link>
      </div>
    </div>
  );
}

export default PostCard;