import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (!name || !email || !password) {
                alert("All fields are required");
                return;
            }

            await API.post("/auth/register", {
                name,
                email,
                password,
            });

            alert("Registration Successful");

            setName("");
            setEmail("");
            setPassword("");

            navigate("/");


        } catch (error) {
            alert(
                "Registration Failed"
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Register
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-3 border rounded mb-4"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border rounded mb-4"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3 border rounded mb-4"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                    <button
                        className="w-full bg-green-600 text-white p-3 rounded"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center mt-4">
                    Already have an account?

                    <Link
                        to="/"
                        className="text-blue-600 ml-2"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;