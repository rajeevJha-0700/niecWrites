import { Link } from "react-router-dom";
import database from '../../Service/DatabaseService.js';
import './PostCard.css';

function PostCard({ $id, title, featuredImage,username,userID }) {
  return (
    <div className="post-card">
      <Link to={`/post/${$id}`} className="post-card-link"> 
        <div className="post-card-image-container">
          <img 
            src={database.fileView(featuredImage)} 
            alt={title}
            className="post-card-image"
          />
          <div className="post-card-overlay"></div>
        </div>
        <div className="post-card-content">
          <h2 className="post-card-title">{title}</h2>
        </div>
       </Link>
        <div className="text-xs font-semibold text-gray-400 tracking-wider uppercase border-b border-gray-200 pb-1 inline-block">
           <Link to={`/users/${userID}`} className="hover:bg-amber-300">author_{username}</Link>
        </div>
       
    </div>
  );
}

export default PostCard;