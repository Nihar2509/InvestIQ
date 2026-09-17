import "./Login.css";
import authImage from "../assets/auth.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/auth/login", {
                email,
                password
            });

            const { token, user } = response.data;

            localStorage.setItem("token", token);

            login(user);

            console.log("Login successful:", user);

            if (user.role === "investor") {
                navigate("/investor-dashboard");
            } else if (user.role === "startup") {
                navigate("/startup-dashboard");
            }

        } catch (error) {
            console.error("Login error:", error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login">

            <div className="login-left">
                <img
                    src={authImage}
                    alt="authentication"
                />
            </div>

            <div className="login-right">

                <div className="login-card">

                    <h1>Welcome Back</h1>

                    <p>
                        Sign in to continue to your InvestIQ dashboard.
                    </p>

                    <form onSubmit={handleLogin}>

                        <div className="input-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                        </div>

                        <div className="input-group">

                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>

                        {error && (
                            <p className="login-error">
                                {error}
                            </p>
                        )}

                        <div className="options">

                            <label>
                                <input type="checkbox" />
                                Remember Me
                            </label>

                            <Link to="/">
                                Forgot Password?
                            </Link>

                        </div>

                        <button
                            className="login-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing In..."
                                : "Sign In"}
                        </button>

                    </form>

                    <p className="signup-text">

                        Don't have an account?

                        <Link to="/">
                            Create an account
                        </Link>

                    </p>

                </div>

            </div>

        </section>
    );
}

export default Login;