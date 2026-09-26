
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";
import "./StartupDetails.css";

function StartupDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStartup = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await API.get(`/startups/${id}`);

                setStartup(response.data.data);
            } catch (err) {
                console.error("Startup details error:", err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load startup."
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchStartup();
        }
    }, [id]);

    if (loading) {
        return (
            <main className="startup-details-page">
                <div className="startup-details-container">
                    <div className="startup-details-loading">
                        Loading startup details...
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="startup-details-page">
                <div className="startup-details-container">
                    <button
                        className="back-button"
                        onClick={() => navigate("/investor-marketplace")}
                    >
                        ← Back to Marketplace
                    </button>

                    <div className="startup-details-error">
                        <h2>Unable to load startup</h2>
                        <p>{error}</p>
                    </div>
                </div>
            </main>
        );
    }

    if (!startup) {
        return (
            <main className="startup-details-page">
                <div className="startup-details-container">
                    <div className="startup-details-error">
                        <h2>Startup not found</h2>
                        <p>
                            The requested startup could not be found.
                        </p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="startup-details-page">
            <div className="startup-details-container">

                <button
                    className="back-button"
                    onClick={() => navigate("/investor-marketplace")}
                >
                    ← Back to Marketplace
                </button>

                {/* HEADER */}
                <section className="startup-hero">

                    {startup.logo && (
                        <div className="startup-logo-large">
                            <img
                                src={startup.logo}
                                alt={`${startup.name} logo`}
                            />
                        </div>
                    )}

                    <div className="startup-hero-content">

                        <div className="startup-status">
                            {startup.status}
                        </div>

                        <h1>{startup.name}</h1>

                        {startup.tagline && (
                            <p className="startup-tagline">
                                {startup.tagline}
                            </p>
                        )}

                        <div className="startup-meta">
                            {startup.industry && (
                                <span>{startup.industry}</span>
                            )}

                            {startup.location && (
                                <span>{startup.location}</span>
                            )}

                            {startup.stage && (
                                <span>{startup.stage}</span>
                            )}
                        </div>

                    </div>

                </section>

                {/* ABOUT */}
                <section className="details-section">
                    <h2>About the Startup</h2>

                    <p>
                        {startup.description ||
                            "No description provided."}
                    </p>
                </section>

                {/* BUSINESS */}
                <section className="details-section">
                    <h2>Business Overview</h2>

                    <div className="details-grid">

                        <div className="detail-box">
                            <span>Problem</span>
                            <p>
                                {startup.problem || "Not provided"}
                            </p>
                        </div>

                        <div className="detail-box">
                            <span>Solution</span>
                            <p>
                                {startup.solution || "Not provided"}
                            </p>
                        </div>

                        <div className="detail-box">
                            <span>Business Model</span>
                            <p>
                                {startup.business_model || "Not provided"}
                            </p>
                        </div>

                        <div className="detail-box">
                            <span>Target Market</span>
                            <p>
                                {startup.target_market || "Not provided"}
                            </p>
                        </div>

                        <div className="detail-box">
                            <span>Competitors</span>
                            <p>
                                {startup.competitors || "Not provided"}
                            </p>
                        </div>

                        <div className="detail-box">
                            <span>Competitive Advantage</span>
                            <p>
                                {startup.competitive_advantage || "Not provided"}
                            </p>
                        </div>

                    </div>
                </section>

                {/* COMPANY INFORMATION */}
                <section className="details-section">
                    <h2>Company Information</h2>

                    <div className="stats-grid">

                        <div className="stat-card">
                            <span>Founded</span>
                            <strong>
                                {startup.founded_year || "N/A"}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Team Size</span>
                            <strong>
                                {startup.team_size || "N/A"}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Customers</span>
                            <strong>
                                {startup.customers ?? "N/A"}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Active Users</span>
                            <strong>
                                {startup.active_users ?? "N/A"}
                            </strong>
                        </div>

                    </div>
                </section>

                {/* FINANCIALS */}
                <section className="details-section">
                    <h2>Financial Overview</h2>

                    <div className="stats-grid">

                        <div className="stat-card">
                            <span>Revenue</span>
                            <strong>
                                ₹{startup.revenue ?? 0}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Monthly Revenue</span>
                            <strong>
                                ₹{startup.monthly_revenue ?? 0}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Revenue Growth</span>
                            <strong>
                                {startup.revenue_growth ?? 0}%
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Monthly Burn</span>
                            <strong>
                                ₹{startup.monthly_burn ?? 0}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Runway</span>
                            <strong>
                                {startup.runway ?? 0} months
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Gross Margin</span>
                            <strong>
                                {startup.gross_margin ?? 0}%
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>CAC</span>
                            <strong>
                                ₹{startup.cac ?? 0}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>LTV</span>
                            <strong>
                                ₹{startup.ltv ?? 0}
                            </strong>
                        </div>

                    </div>
                </section>

                {/* FUNDING */}
                <section className="details-section">
                    <h2>Funding Information</h2>

                    <div className="stats-grid">

                        <div className="stat-card">
                            <span>Funding Stage</span>
                            <strong>
                                {startup.funding_stage || "N/A"}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Funding Required</span>
                            <strong>
                                ₹{startup.funding_required ?? 0}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Amount Raised</span>
                            <strong>
                                ₹{startup.amount_raised ?? 0}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Valuation</span>
                            <strong>
                                ₹{startup.valuation ?? 0}
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Equity Offered</span>
                            <strong>
                                {startup.equity_offered ?? 0}%
                            </strong>
                        </div>

                        <div className="stat-card">
                            <span>Minimum Investment</span>
                            <strong>
                                ₹{startup.minimum_investment ?? 0}
                            </strong>
                        </div>

                    </div>
                </section>

                {/* WEBSITE */}
                {startup.website && (
                    <section className="details-section">
                        <h2>Website</h2>

                        <a
                            href={startup.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="startup-website"
                        >
                            Visit Startup Website →
                        </a>
                    </section>
                )}

            </div>
        </main>
    );
}

export default StartupDetails;

