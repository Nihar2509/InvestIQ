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

                const response = await API.get(
                    `/startups/${id}`
                );

                setStartup(response.data.data);
            } catch (err) {
                console.error(
                    "Startup details error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load startup."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStartup();
    }, [id]);

    if (loading) {
        return (
            <main className="startup-details-page">
                <div className="startup-details-container">
                    <div className="details-loading">
                        Loading startup...
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="startup-details-page">
                <div className="startup-details-container">
                    <div className="details-error">
                        <p>{error}</p>

                        <button
                            className="back-button"
                            onClick={() =>
                                navigate(
                                    "/investor-marketplace"
                                )
                            }
                        >
                            ← Back to Marketplace
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    if (!startup) {
        return (
            <main className="startup-details-page">
                <div className="startup-details-container">
                    <div className="details-error">
                        <p>Startup not found.</p>

                        <button
                            className="back-button"
                            onClick={() =>
                                navigate(
                                    "/investor-marketplace"
                                )
                            }
                        >
                            ← Back to Marketplace
                        </button>
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
                    onClick={() =>
                        navigate(
                            "/investor-marketplace"
                        )
                    }
                >
                    ← Back to Marketplace
                </button>

                <section className="startup-hero">

                    <div className="startup-details-logo">
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

                    <div className="startup-hero-content">
                        <p className="details-label">
                            Startup Profile
                        </p>

                        <h1>{startup.name}</h1>

                        {startup.tagline && (
                            <p className="startup-details-tagline">
                                {startup.tagline}
                            </p>
                        )}

                        <div className="startup-meta">
                            {startup.industry && (
                                <span>
                                    {startup.industry}
                                </span>
                            )}

                            {startup.location && (
                                <span>
                                    {startup.location}
                                </span>
                            )}

                            {startup.stage && (
                                <span>
                                    {startup.stage}
                                </span>
                            )}
                        </div>
                    </div>

                </section>

                <section className="details-section">

                    <div className="section-heading">
                        <h2>
                            Company Information
                        </h2>
                    </div>

                    <div className="details-grid">

                        <div className="detail-item">
                            <span>
                                Industry
                            </span>

                            <strong>
                                {startup.industry ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Sub Industry
                            </span>

                            <strong>
                                {startup.sub_industry ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Founded Year
                            </span>

                            <strong>
                                {startup.founded_year ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Location
                            </span>

                            <strong>
                                {startup.location ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Stage
                            </span>

                            <strong>
                                {startup.stage ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Team Size
                            </span>

                            <strong>
                                {startup.team_size ||
                                    "Not specified"}
                            </strong>
                        </div>

                    </div>

                    {startup.website && (
                        <div className="website-row">
                            <span>
                                Website
                            </span>

                            <a
                                href={startup.website}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {startup.website}
                            </a>
                        </div>
                    )}

                </section>

                <section className="details-section">

                    <div className="section-heading">
                        <h2>
                            Business Overview
                        </h2>
                    </div>

                    <div className="text-details">

                        <div>
                            <h3>
                                Description
                            </h3>

                            <p>
                                {startup.description ||
                                    "Not provided"}
                            </p>
                        </div>

                        <div>
                            <h3>
                                Problem
                            </h3>

                            <p>
                                {startup.problem ||
                                    "Not provided"}
                            </p>
                        </div>

                        <div>
                            <h3>
                                Solution
                            </h3>

                            <p>
                                {startup.solution ||
                                    "Not provided"}
                            </p>
                        </div>

                        <div>
                            <h3>
                                Business Model
                            </h3>

                            <p>
                                {startup.business_model ||
                                    "Not provided"}
                            </p>
                        </div>

                        <div>
                            <h3>
                                Target Market
                            </h3>

                            <p>
                                {startup.target_market ||
                                    "Not provided"}
                            </p>
                        </div>

                        <div>
                            <h3>
                                Competitors
                            </h3>

                            <p>
                                {startup.competitors ||
                                    "Not provided"}
                            </p>
                        </div>

                        <div>
                            <h3>
                                Competitive Advantage
                            </h3>

                            <p>
                                {startup.competitive_advantage ||
                                    "Not provided"}
                            </p>
                        </div>

                    </div>

                </section>

                <section className="details-section">

                    <div className="section-heading">
                        <h2>
                            Traction & Financials
                        </h2>
                    </div>

                    <div className="details-grid">

                        <div className="detail-item">
                            <span>
                                Revenue
                            </span>

                            <strong>
                                ₹{startup.revenue || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Monthly Revenue
                            </span>

                            <strong>
                                ₹{startup.monthly_revenue || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Revenue Growth
                            </span>

                            <strong>
                                {startup.revenue_growth || 0}%
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Customers
                            </span>

                            <strong>
                                {startup.customers || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Active Users
                            </span>

                            <strong>
                                {startup.active_users || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Monthly Burn
                            </span>

                            <strong>
                                ₹{startup.monthly_burn || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Runway
                            </span>

                            <strong>
                                {startup.runway || 0} months
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Gross Margin
                            </span>

                            <strong>
                                {startup.gross_margin || 0}%
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Customer Acquisition Cost
                            </span>

                            <strong>
                                ₹{startup.cac || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Customer Lifetime Value
                            </span>

                            <strong>
                                ₹{startup.ltv || 0}
                            </strong>
                        </div>

                    </div>

                </section>

                <section className="details-section">

                    <div className="section-heading">
                        <h2>
                            Funding Information
                        </h2>
                    </div>

                    <div className="details-grid">

                        <div className="detail-item">
                            <span>
                                Funding Stage
                            </span>

                            <strong>
                                {startup.funding_stage ||
                                    "Not specified"}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Funding Required
                            </span>

                            <strong>
                                ₹{startup.funding_required || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Amount Raised
                            </span>

                            <strong>
                                ₹{startup.amount_raised || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Valuation
                            </span>

                            <strong>
                                ₹{startup.valuation || 0}
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Equity Offered
                            </span>

                            <strong>
                                {startup.equity_offered || 0}%
                            </strong>
                        </div>

                        <div className="detail-item">
                            <span>
                                Minimum Investment
                            </span>

                            <strong>
                                ₹{startup.minimum_investment || 0}
                            </strong>
                        </div>

                    </div>

                </section>

            </div>
        </main>
    );
}

export default StartupDetails;