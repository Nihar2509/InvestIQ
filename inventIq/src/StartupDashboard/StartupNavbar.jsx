import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./StartupNavbar.css";

function StartupNavbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="startup-navbar">

            <div className="startup-navbar-logo">
                Invest<span>IQ</span>
            </div>

            <div className="startup-navbar-links">

                <button>
                    Dashboard
                </button>

                <button>
                    Startup Profile
                </button>

                <button>
                    Documents
                </button>

            </div>

            <div className="startup-navbar-user">

                <div className="startup-user-info">
                    <span className="startup-user-name">
                        {user?.name}
                    </span>

                    <span className="startup-user-role">
                        Founder
                    </span>
                </div>

                <button
                    className="startup-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default StartupNavbar;