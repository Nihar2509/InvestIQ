import "./Login.css";
import authImage from "../assets/auth.png";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <div className="login-left">
        <img src={authImage} alt="authentication" />
      </div>
      <div className="login-right">
        <div className="login-card">
          <h1>Welcome Back </h1>
          <p>
            Sign in to continue to your InvestIQ dashboard.
          </p>

          <form>

            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password"/>
            </div>

            <div className="options">
              <label>
                <input type="checkbox" />Remember Me 
              </label> 
              <Link to="/">
                Forgot Password?
              </Link>
            </div>

            <button className="login-btn">
              Sign In
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