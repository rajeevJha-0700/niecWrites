import {useState,useEffect} from "react"
import { useSelector } from "react-redux"
import database from "../Service/DatabaseService"
import Container from "./Container.jsx";
import { PostCard } from "./Warehouse.js";

function MyPost() {
    const [posts,setPosts] = useState([]);
    let userID = useSelector(state => state.authorization.userData.$id)
    useEffect(()=>{
        database.getAllPost_user(userID).then((posts)=>setPosts(posts.documents))
    },[])
  return (
    
       <div className='w-full py-8'>
              <Container>
                  <div className='flex flex-wrap'>
                      {posts.map((post) => (
                          <div key={post.$id} className='p-2 w-1/4'>
                              <PostCard {...post} />
                          </div>
                      ))}
                  </div>
                  </Container>
          </div>
   
  )
}

export default MyPost
