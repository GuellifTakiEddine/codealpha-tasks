import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        username: "",
        email: "",
        password: ""

    });

    const [loading, setLoading] = useState(false);

    function handleChange(e){

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    }

    async function handleSubmit(e){

        e.preventDefault();

        try{

            setLoading(true);

            await API.post("/auth/register",form);

            navigate("/login");

        }catch(err){

            alert(err.response?.data?.message);

        }finally{

            setLoading(false);

        }

    }

    return(

        <div className="authPage">

            <div className="leftSide">

                <h1>SocialBook</h1>

                <p>

                    Join thousands of people sharing their stories.

                </p>

            </div>

            <div className="authCard">

                <h2>Create Account</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />

                    <button>

                        {loading ? "Creating..." : "Register"}

                    </button>

                </form>

                <p>

                    Already have an account?

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}