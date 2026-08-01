import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);

            navigate("/");

        } catch (err) {

            alert(err.response?.data?.message || "Login failed");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="authPage">

            <div className="leftSide">

                <h1>SocialBook</h1>

                <p>

                    Connect with your friends,
                    share your moments,
                    and discover new people.

                </p>

            </div>

            <div className="authCard">

                <h2>Welcome Back 👋</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button>

                        {loading ? "Logging in..." : "Login"}

                    </button>

                </form>

                <p>

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}