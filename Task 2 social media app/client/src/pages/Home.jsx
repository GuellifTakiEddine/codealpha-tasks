import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

import "./Home.css";

export default function Home(){

    const [posts,setPosts]=useState([]);

    async function loadPosts(){

        try{

            const res=await API.get("/posts");

            setPosts(res.data);

        }catch(err){

            console.log(err);

        }

    }

    useEffect(()=>{

        loadPosts();

    },[]);

    return(

        <>

            <Navbar/>

            <div className="home">

                <Sidebar/>

                <main className="feed">

                    <CreatePost
                        onPostCreated={loadPosts}
                    />

                    {posts.map(post=>(

                        <PostCard

                            key={post._id}

                            post={post}

                            refreshPosts={loadPosts}

                        />

                    ))}

                </main>

                <Rightbar/>

            </div>

        </>

    );

}