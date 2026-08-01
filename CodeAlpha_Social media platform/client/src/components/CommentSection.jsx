import { useEffect, useState } from "react";
import API from "../services/api";
import "./CommentSection.css";

export default function CommentSection({ postId }) {

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    async function loadComments() {
        try {
            const res = await API.get(`/comments/${postId}`);
            setComments(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadComments();
    }, [postId]);

    async function addComment() {

        if (!text.trim()) return;

        try {

            await API.post("/comments", {
                post: postId,
                text
            });

            setText("");

            loadComments();

        } catch (err) {
            console.log(err);
        }

    }

    async function deleteComment(id) {

        try {

            await API.delete(`/comments/${id}`);

            loadComments();

        } catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="commentsBox">

            <div className="writeComment">

                <input

                    placeholder="Write a comment..."

                    value={text}

                    onChange={e => setText(e.target.value)}

                />

                <button onClick={addComment}>

                    Post

                </button>

            </div>

            {comments.length === 0 && (

                <p className="emptyComment">

                    Be the first to comment.

                </p>

            )}

            {comments.map(comment => (

                <div className="commentCard" key={comment._id}>

                    <img

                        src={`https://ui-avatars.com/api/?background=1877f2&color=fff&name=${comment.user.username}`}

                        alt=""

                    />

                    <div className="commentContent">

                        <h4>{comment.user.username}</h4>

                        <p>{comment.text}</p>

                        <span>

                            {new Date(comment.createdAt).toLocaleString()}

                        </span>

                    </div>

                    <button

                        className="deleteComment"

                        onClick={() => deleteComment(comment._id)}

                    >

                        Delete

                    </button>

                </div>

            ))}

        </div>

    );

}