import {

FaHeart,
FaRegHeart,
FaTrash,
FaComment

} from "react-icons/fa";

import API from "../services/api";
import CommentSection from "./CommentSection";
import "./PostCard.css";

export default function PostCard({post,refreshPosts}){

async function like(){

await API.put(`/posts/like/${post._id}`);

refreshPosts();

}

async function remove(){

await API.delete(`/posts/${post._id}`);

refreshPosts();

}
const currentUserId = localStorage.getItem("userId");

{post.user._id === currentUserId && (
    <button className="delete" onClick={remove}>
        Delete
    </button>
)}
return(

<div className="postCard">

<div className="userInfo">

<img

src={`https://ui-avatars.com/api/?background=1877f2&color=fff&name=${post.user.username}`}

alt=""

/>

<div>

<h3>{post.user.username}</h3>

<span>

{new Date(post.createdAt).toLocaleString()}

</span>

</div>

</div>

<p className="postText">

{post.text}

</p>

<div className="actions">

<button onClick={like}>

<FaHeart/>

{post.likes.length}

</button>

<button>

<FaComment/>

Comment

</button>

<button
className="delete"
onClick={remove}
>

<FaTrash/>

Delete

</button>

</div>
<CommentSection postId={post._id} />
</div>

)

}