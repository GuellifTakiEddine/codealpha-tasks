import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {

    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (

        <nav className="navbar">

            <div className="logo">
                SocialBook
            </div>

            <div className="navCenter">

                <Link to="/">
                    <FaHome />
                    Home
                </Link>

                <Link to="/profile">
                    <FaUserCircle />
                    Profile
                </Link>

            </div>

            <button className="logoutBtn" onClick={logout}>

                <FaSignOutAlt />

                Logout

            </button>

        </nav>

    );

}