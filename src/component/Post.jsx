import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import database from "../Service/DatabaseService.js";
import { Button, Container } from "./Warehouse.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    
    const navigate = useNavigate();

    const userData = useSelector((state) => state.authorization.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false; 
     
    useEffect(() => {
        if (slug) {
            database.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
                else {
                    navigate("/");
                }
               
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        database.deletePost(post.$id).then((status) => {
            if (status) {
               database.deleteFile(post.featuredImage).then((success)=>{
                console.log("success message: ", success);
                  navigate("/");
               });
               
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                    <img
                        src={database.fileView(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-green-500 mr-3" assign={"edit"}/>
                            </Link>
                            <Button className="bg-red-500" onClick={deletePost} assign={"delete"}/>

                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
          
        </div>
    ) : null;
}