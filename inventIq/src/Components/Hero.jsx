import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {

    const navigate = useNavigate();

    return (

        <section className="hero">

           

            <h1>
                Smarter Startup
                <br />
                Investing Begins Here
            </h1>

            <p>

                Publish startups, connect with investors,
                and secure funding for your startup.

            </p>

            <div className="hero-buttons">

                <button
                    className="primary-btn"
                    onClick={() => navigate("/signup?role=investor")}
                >
                    I am an Investor
                </button>

                <button
                    className="secondary-btn"
                    onClick={() => navigate("/signup?role=startup")}
                >
                    I am a Startup Founder
                </button>

            </div>

        </section>

    );
}

export default Hero;