import "./Register.css";
import authImage from "../assets/auth.png";

import {
    Link,
    useSearchParams,
    useNavigate
} from "react-router-dom";

import { useState } from "react";
import API from "../api/api";


function Register() {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get role from URL:
    // /signup?role=investor
    // /signup?role=startup
    const role = searchParams.get("role");


    // Form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });


    // Terms checkbox
    const [agree, setAgree] = useState(false);

    // Messages
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Loading state
    const [loading, setLoading] = useState(false);


    // Handle input changes
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    // Handle registration
    const handleSubmit = async (e) => {

        e.preventDefault();

        // Clear old messages
        setError("");
        setSuccess("");


        // -----------------------
        // VALIDATION
        // -----------------------

        if (!formData.name.trim()) {

            return setError("Full name is required");

        }


        if (!formData.email.trim()) {

            return setError("Email is required");

        }


        if (!formData.password) {

            return setError("Password is required");

        }


        if (!formData.confirmPassword) {

            return setError("Please confirm your password");

        }


        // Passwords must match
        if (
            formData.password !==
            formData.confirmPassword
        ) {

            return setError(
                "Passwords do not match"
            );

        }


        // Strong password
        const strongPassword =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


        if (!strongPassword.test(formData.password)) {

            return setError(
                "Password must be at least 8 characters and contain uppercase, lowercase, number and special character"
            );

        }


        // Role validation
        if (
            role !== "investor" &&
            role !== "startup"
        ) {

            return setError(
                "Please choose Investor or Startup Founder first"
            );

        }


        // Terms validation
        if (!agree) {

            return setError(
                "Please accept the Terms & Conditions"
            );

        }


        // -----------------------
        // SEND TO BACKEND
        // -----------------------

        try {

            setLoading(true);


            const response = await API.post(
                "/auth/register",
                {
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                    role: role
                }
            );


            console.log(response.data);


            setSuccess(
                "Account created successfully! Redirecting to login..."
            );


            // Clear form
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setAgree(false);


            // Redirect to login
            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(error);


            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <section className="register">


            {/* LEFT SIDE */}

            <div className="register-left">

                <img
                    src={authImage}
                    alt="Authentication"
                />


                <div className="left-content">

                    <h1>
                        InvestIQ
                    </h1>


                    <p>
                        AI Powered Startup Due Diligence Platform
                    </p>


                    <div className="feature">

                        <span>
                            ✔ AI Startup Analysis
                        </span>

                        <span>
                            ✔ Smart Risk Assessment
                        </span>

                        <span>
                            ✔ Secure Platform
                        </span>

                        <span>
                            ✔ Faster Investment Decisions
                        </span>

                    </div>

                </div>

            </div>



            {/* RIGHT SIDE */}

            <div className="register-right">

                <div className="register-card">


                    <span className="small-title">
                        Create Account
                    </span>


                    <h2>
                        Join InvestIQ 🚀
                    </h2>


                    <p>
                        Start your AI-powered investment journey today.
                    </p>



                    <form onSubmit={handleSubmit}>


                        {/* NAME */}

                        <div className="input-group">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                            />

                        </div>



                        {/* EMAIL */}

                        <div className="input-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>



                        {/* PASSWORD */}

                        <div className="input-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                            />

                        </div>



                        {/* CONFIRM PASSWORD */}

                        <div className="input-group">

                            <label>
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                        </div>



                        {/* ROLE */}

                        <div className="input-group">

                            <label>
                                Account Type
                            </label>


                            <div className="role-box">

                                {
                                    role === "startup"
                                        ? "🚀 Startup Founder"
                                        : role === "investor"
                                        ? "👨‍💼 Investor"
                                        : "Please choose a role"
                                }

                            </div>

                        </div>



                        {/* TERMS */}

                        <div className="terms">

                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) =>
                                    setAgree(e.target.checked)
                                }
                            />


                            <span>
                                I agree to the Terms & Conditions
                            </span>

                        </div>



                        {/* ERROR */}

                        {
                            error && (

                                <p className="error-message">
                                    {error}
                                </p>

                            )
                        }



                        {/* SUCCESS */}

                        {
                            success && (

                                <p className="success-message">
                                    {success}
                                </p>

                            )
                        }



                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? "Creating Account..."
                                    : "Create Account"
                            }

                        </button>


                    </form>



                    <div className="bottom-text">

                        Already have an account?

                        <Link to="/login">
                            Login
                        </Link>

                    </div>


                </div>

            </div>

        </section>

    );

}

export default Register;