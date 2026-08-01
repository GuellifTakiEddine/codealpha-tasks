import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import PostCard from "../components/PostCard";

import API from "../services/api";

import "./Profile.css";

export default function Profile() {

    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [me, setMe] = useState(null);
    const [following, setFollowing] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
async function loadProfile() {
    try {

        // Logged-in user
        const meRes = await API.get("/users/me");
        setCurrentUser(meRes.data.user);

        // Viewed profile
        const profileRes = await API.get(`/users/${id}`);

        setUser(profileRes.data.user);
        setPosts(profileRes.data.posts);

        setFollowing(
            meRes.data.user.following.includes(profileRes.data.user._id)
        );

    } catch (err) {

        console.log(err);

    }
}

    useEffect(() => {

        loadProfile();

    }, [id]);

    async function followUser() {

        try {

            if (following) {

                await API.put(`/users/unfollow/${user._id}`);

            } else {

                await API.put(`/users/follow/${user._id}`);

            }

            loadProfile();

        } catch (err) {

            console.log(err);

        }

    }

    if (!user) return <h2>Loading...</h2>;
async function handleFollow() {

    try {

        if (following) {

            await API.put(`/users/unfollow/${user._id}`);

        } else {

            await API.put(`/users/follow/${user._id}`);

        }

        // Reload profile to update counts
        loadProfile();

    } catch (err) {

        console.log(err);

    }

}
    return (

        <>

            <Navbar />

            <div className="profilePage">

                <Sidebar />

                <div className="profileContent">

                    <div className="profileHeader">

                        <img
                            src={`https://ui-avatars.com/api/?background=1877f2&color=fff&name=${user.username}`}
                            alt=""
                        />

                        <div className="profileInfo">

                            <h1>{user.username}</h1>

                            <p>{user.bio || "No bio available."}</p>
{currentUser && currentUser._id !== user._id && (

    <button
        className="followBtn"
        onClick={handleFollow}
    >

        {following ? "Following ✓" : "Follow"}

    </button>

)}
                            <div className="profileNumbers">

                                <div>

                                    <h2>{posts.length}</h2>

                                    <span>Posts</span>

                                </div>

                                <div>

                                    <h2>{user.followers.length}</h2>

                                    <span>Followers</span>

                                </div>

                                <div>

                                    <h2>{user.following.length}</h2>

                                    <span>Following</span>

                                </div>

                            </div>

                            {me && me._id !== user._id && (

                                <button
                                    className="followBtn"
                                    onClick={followUser}
                                >

                                    {following ? "Following ✓" : "Follow"}

                                </button>

                            )}

                        </div>

                    </div>

                    <h2 className="title">

                        Posts

                    </h2>

                    {posts.length === 0 ? (

                        <div className="emptyPosts">

                            No posts yet.

                        </div>

                    ) : (

                        posts.map(post => (

                            <PostCard

                                key={post._id}

                                post={post}

                                refreshPosts={loadProfile}

                            />

                        ))

                    )}

                </div>

                <Rightbar />

            </div>

        </>

    );

}