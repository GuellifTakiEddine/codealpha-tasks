import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

import {
    FaHome,
    FaBookmark,
    FaUserFriends
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar() {

    const [users, setUsers] = useState([]);

    async function loadUsers() {

        try {

            const res = await API.get("/users");

            setUsers(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    useEffect(() => {

        loadUsers();

    }, []);

    return (

        <div className="sidebar">

            <h2>Explore</h2>

            <div className="menu">

                <Link to="/">
                    <FaHome />
                    Feed
                </Link>

                <div>
                    <FaBookmark />
                    Saved
                </div>

                <div>
                    <FaUserFriends />
                    Friends
                </div>

            </div>

            <h3 className="peopleTitle">

                People

            </h3>

            <div className="people">

                {users.map(user => (

                    <Link

                        key={user._id}

                        to={`/profile/${user._id}`}

                        className="person"

                    >

                        <img

                            src={`https://ui-avatars.com/api/?background=1877f2&color=fff&name=${user.username}`}

                            alt=""

                        />

                        <span>

                            {user.username}

                        </span>

                    </Link>

                ))}

            </div>

        </div>

    );

}