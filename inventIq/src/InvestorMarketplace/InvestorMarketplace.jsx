import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./InvestorMarketplace.css";

function InvestorMarketplace() {
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
                    "Marketplace error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load startups."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStartups();
    }, []);

    if (loading) {
        return (
            <main className="marketplace-page">
                <div className="marketplace-container">
                    <div className="marketplace-loading">
                        Loading startups...
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="marketplace-page">
            <div className="marketplace-container">

                <div className="marketplace-header">
                    <div>
                        <p className="marketplace-label">
                            Investor Marketplace
                        </p>

                        <h1>
                            Discover Startups
                        </h1>

                        <p className="marketplace-subtitle">
                            Explore published startups and
                            review their business information.
                        </p>
                    </div>

                    <div className="startup-count">
                        {startups.length}{" "}
                        {startups.length === 1
                            ? "Startup"
                            : "Startups"}
                    </div>
                </div>

                {error && (
                    <div className="marketplace-error">
                        {error}
                    </div>
                )}

                {!error && startups.length === 0 && (
                    <div className="marketplace-empty">
                        <h2>
                            No published startups yet
                        </h2>

                        <p>
                            Startups that publish their
                            profiles will appear here.
                        </p>
                    </div>
                )}

                {!error && startups.length > 0 && (
                    <div className="startup-grid">
                        {startups.map((startup) => (
                            <article
                                className="startup-card"
                                key={startup.id}
                            >
                                <div className="startup-card-header">

                                    <div className="startup-logo">
                                        {startup.logo ? (
                                            <img
                                                src={startup.logo}
                                                alt={`${startup.name} logo`}
                                            />
                                        ) : (
                                            startup.name
                                                ?.charAt(0)
                                                .toUpperCase()
                                        )}
                                    </div>

                                    <div className="startup-card-title">
                                        <h2>
                                            {startup.name}
                                        </h2>

                                        {startup.tagline && (
                                            <p>
                                                {startup.tagline}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                <div className="startup-card-details">

                                    <div className="startup-detail">
                                        <span>
                                            Industry
                                        </span>

                                        <strong>
                                            {startup.industry ||
                                                "Not specified"}
                                        </strong>
                                    </div>

                                    <div className="startup-detail">
                                        <span>
                                            Location
                                        </span>

                                        <strong>
                                            {startup.location ||
                                                "Not specified"}
                                        </strong>
                                    </div>

                                    <div className="startup-detail">
                                        <span>
                                            Stage
                                        </span>

                                        <strong>
                                            {startup.stage ||
                                                "Not specified"}
                                        </strong>
                                    </div>

                                </div>

                                {startup.description && (
                                    <p className="startup-description">
                                        {startup.description}
                                    </p>
                                )}

                                <button
                                    className="view-startup-button"
                                    onClick={() =>
                                        navigate(
                                            `/startup/${startup.id}`
                                        )
                                    }
                                >
                                    View Startup
                                </button>

                            </article>
                        ))}
                    </div>
                )}

            </div>
        </main>
    );
}

export default InvestorMarketplace;