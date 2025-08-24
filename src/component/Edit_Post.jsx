import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import database from '../Service/DatabaseService.js'
import {Container,PostForm} from  "./Warehouse.js"
function Edit_Post() {
    const [post,setPost] = React.useState(null)
    const {slug} = useParams();
    const navigate = useNavigate();
   React.useEffect(()=>{
     if(slug) {database.getPost(slug).then((post)=>{
        
        setPost(post);
    })}
    else{
        navigate('/')
    }
   },[slug])
  return post ? ( <div className='py-8'>
        <Container>
            <PostForm Post_Object={post} />
        </Container>
    </div>) : null;
}

export default Edit_Post
