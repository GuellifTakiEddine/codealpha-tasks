import { useEffect, useState } from "react";
import API from "../services/api";
import "./Rightbar.css";

export default function Rightbar() {

    const [user, setUser] = useState(null);
    const [postsCount, setPostsCount] = useState(0);

    async function loadUser() {
        try {

            const res = await API.get("/users/me");

            setUser(res.data.user);
            setPostsCount(res.data.posts.length);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    if (!user) return null;

    return (

        <div className="rightbar">

            <div className="profileCard">

                <img
                    src={`https://ui-avatars.com/api/?background=1877f2&color=fff&name=${user.username}`}
                    alt=""
                />

                <h2>{user.username}</h2>

                <p>{user.bio || "Welcome back 👋"}</p>

                <div className="numbers">

                    <div>

                        <h3>{postsCount}</h3>

                        <span>Posts</span>

                    </div>

                    <div>

                        <h3>{user.followers.length}</h3>

                        <span>Followers</span>

                    </div>

                    <div>

                        <h3>{user.following.length}</h3>

                        <span>Following</span>

                    </div>

                </div>

            </div>

        </div>

    );

}