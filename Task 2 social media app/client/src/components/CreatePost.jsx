import { useState } from "react";
import { FaPaperPlane, FaImage } from "react-icons/fa";
import API from "../services/api";
import "./CreatePost.css";
import { toast } from "react-toastify";
export default function CreatePost({ onPostCreated }) {

    const [text,setText]=useState("");

    async function submit(e){

        e.preventDefault();

        if(!text.trim()) return;

        try{

            await API.post("/posts",{

                text,
                image:""

            });

            setText("");

            onPostCreated();

        }catch(err){

            console.log(err);

        }

    }


async function submit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    try {

        await API.post("/posts", {
            text,
            image: ""
        });

        toast.success("Post created successfully!");

        setText("");

        onPostCreated();

    } catch (err) {

        console.log(err);

        toast.error("Failed to create post!");

    }
}
    return(

        <div className="createPost">

            <div className="postTop">

                <img

                src={`https://ui-avatars.com/api/?background=1877f2&color=fff&name=ME`}

                alt=""

                />

                <textarea

                value={text}

                onChange={e=>setText(e.target.value)}

                placeholder="What's on your mind?"

                />

            </div>

            <div className="postBottom">

                <button className="photoBtn">

                    <FaImage/>

                    Photo

                </button>

                <button
                className="shareBtn"
                onClick={submit}
                >

                    <FaPaperPlane/>

                    Share

                </button>

            </div>

        </div>

    )

}