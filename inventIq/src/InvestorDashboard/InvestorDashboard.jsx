import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";
import "./InvestorDashboard.css";

function InvestorDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStartups = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await API.get(
                    "/startups/marketplace"
                );

                setStartups(response.data.data || []);
            } catch (err) {
                console.error(
                    "Investor dashboard error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load dashboard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStartups();
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleMarketplace = () => {
        navigate("/investor-marketplace");
    };

    const handleStartupView = (startupId) => {
        navigate(`/startup/${startupId}`);
    };

    return (
        <main className="investor-dashboard">

            <header className="investor-navbar">

                <div className="investor-logo">
                    Invest<span>IQ</span>
                </div>

                <nav className="investor-nav-links">
                    <button
                        className="active"
                        onClick={() =>
                            navigate("/investor-dashboard")
                        }
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={handleMarketplace}
                    >
                        Marketplace
                    </button>
                </nav>

                <div className="investor-user-area">

                    <div className="investor-user-info">
                        <strong>
                            {user?.name}
                        </strong>

                        <span>
                            Investor
                        </span>
                    </div>

                    <button
                        className="investor-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>

            <div className="investor-dashboard-container">

                <section className="investor-welcome">

                    <div>
                        <p className="investor-label">
                            Investor Dashboard
                        </p>

                        <h1>
                            Welcome, {user?.name}
                        </h1>

                        <p>
                            Discover and review startups
                            available on the InvestIQ
                            marketplace.
                        </p>
                    </div>

                    <button
                        className="marketplace-button"
                        onClick={handleMarketplace}
                    >
                        Explore Marketplace
                    </button>

                </section>

                <section className="investor-stats">

                    <div className="investor-stat-card">
                        <span>
                            Published Startups
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : startups.length}
                        </strong>
                    </div>

                    <div className="investor-stat-card">
                        <span>
                            Available for Review
                        </span>

                        <strong>
                            {loading
                                ? "—"
                                : startups.length}
                        </strong>
                    </div>

                    <div className="investor-stat-card">
                        <span>
                            Profile Status
                        </span>

                        <strong>
                            Active
                        </strong>
                    </div>

                </section>

                <section className="investor-startups">

                    <div className="section-header">

                        <div>
                            <h2>
                                Recent Startups
                            </h2>

                            <p>
                                Published startups currently
                                available for discovery.
                            </p>
                        </div>

                        {startups.length > 0 && (
                            <button
                                className="view-all-button"
                                onClick={
                                    handleMarketplace
                                }
                            >
                                View All
                            </button>
                        )}

                    </div>

                    {loading && (
                        <div className="investor-loading">
                            Loading startups...
                        </div>
                    )}

                    {!loading && error && (
                        <div className="investor-error">
                            {error}
                        </div>
                    )}

                    {!loading &&
                        !error &&
                        startups.length === 0 && (
                            <div className="investor-empty">
                                <h3>
                                    No startups available
                                </h3>

                                <p>
                                    Published startups will
                                    appear here when they become
                                    available.
                                </p>
                            </div>
                        )}

                    {!loading &&
                        !error &&
                        startups.length > 0 && (
                            <div className="investor-startup-list">

                                {startups
                                    .slice(0, 5)
                                    .map((startup) => (
                                        <article
                                            className="investor-startup-card"
                                            key={startup.id}
                                        >

                                            <div className="investor-startup-main">

                                                <div className="investor-startup-logo">
                                                    {startup.logo ? (
                                                        <img
                                                            src={
                                                                startup.logo
                                                            }
                                                            alt={`${startup.name} logo`}
                                                        />
                                                    ) : (
                                                        startup.name
                                                            ?.charAt(0)
                                                            .toUpperCase()
                                                    )}
                                                </div>

                                                <div>
                                                    <h3>
                                                        {
                                                            startup.name
                                                        }
                                                    </h3>

                                                    {startup.tagline && (
                                                        <p>
                                                            {
                                                                startup.tagline
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                            </div>

                                            <div className="investor-startup-meta">

                                                <span>
                                                    {startup.industry ||
                                                        "Industry not specified"}
                                                </span>

                                                <span>
                                                    {startup.stage ||
                                                        "Stage not specified"}
                                                </span>

                                                <span>
                                                    {startup.location ||
                                                        "Location not specified"}
                                                </span>

                                            </div>

                                            <button
                                                className="startup-view-button"
                                                onClick={() =>
                                                    handleStartupView(
                                                        startup.id
                                                    )
                                                }
                                            >
                                                View Startup
                                            </button>

                                        </article>
                                    ))}

                            </div>
                        )}

                </section>

            </div>

        </main>
    );
}

export default InvestorDashboard;