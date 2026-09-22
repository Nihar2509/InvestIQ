import { useEffect, useState } from "react";
import API from "../api/api";
import "./StartupForm.css";

const initialFormData = {
    name: "",
    tagline: "",
    industry: "",
    sub_industry: "",
    founded_year: "",
    location: "",
    website: "",

    description: "",
    problem: "",
    solution: "",
    business_model: "",
    target_market: "",
    competitors: "",
    competitive_advantage: "",

    stage: "",
    team_size: "",
    revenue: "",
    monthly_revenue: "",
    revenue_growth: "",
    customers: "",
    active_users: "",
    monthly_burn: "",
    runway: "",
    gross_margin: "",
    cac: "",
    ltv: "",

    funding_stage: "",
    funding_required: "",
    amount_raised: "",
    valuation: "",
    equity_offered: "",
    minimum_investment: ""
};

function StartupForm({ existingStartup, onSaved }) {
    const [formData, setFormData] = useState(initialFormData);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const isEditing = Boolean(existingStartup);

    useEffect(() => {
        if (existingStartup) {
            setFormData({
                ...initialFormData,
                ...existingStartup
            });
        }
    }, [existingStartup]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.name.trim()) {
            setError("Startup name is required.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                ...formData,

                founded_year:
                    formData.founded_year
                        ? Number(formData.founded_year)
                        : null,

                team_size:
                    formData.team_size
                        ? Number(formData.team_size)
                        : null,

                revenue:
                    formData.revenue
                        ? Number(formData.revenue)
                        : 0,

                monthly_revenue:
                    formData.monthly_revenue
                        ? Number(formData.monthly_revenue)
                        : 0,

                revenue_growth:
                    formData.revenue_growth
                        ? Number(formData.revenue_growth)
                        : 0,

                customers:
                    formData.customers
                        ? Number(formData.customers)
                        : 0,

                active_users:
                    formData.active_users
                        ? Number(formData.active_users)
                        : 0,

                monthly_burn:
                    formData.monthly_burn
                        ? Number(formData.monthly_burn)
                        : 0,

                runway:
                    formData.runway
                        ? Number(formData.runway)
                        : 0,

                gross_margin:
                    formData.gross_margin
                        ? Number(formData.gross_margin)
                        : 0,

                cac:
                    formData.cac
                        ? Number(formData.cac)
                        : 0,

                ltv:
                    formData.ltv
                        ? Number(formData.ltv)
                        : 0,

                funding_required:
                    formData.funding_required
                        ? Number(formData.funding_required)
                        : 0,

                amount_raised:
                    formData.amount_raised
                        ? Number(formData.amount_raised)
                        : 0,

                valuation:
                    formData.valuation
                        ? Number(formData.valuation)
                        : 0,

                equity_offered:
                    formData.equity_offered
                        ? Number(formData.equity_offered)
                        : 0,

                minimum_investment:
                    formData.minimum_investment
                        ? Number(formData.minimum_investment)
                        : 0
            };

            const response = isEditing
                ? await API.put("/startups/me", payload)
                : await API.post("/startups", payload);

            setSuccess(
                isEditing
                    ? "Startup updated successfully."
                    : "Startup created successfully."
            );

            if (!isEditing) {
                setFormData(initialFormData);
            }

            if (onSaved) {
                setTimeout(() => {
                    onSaved(response.data.data);
                }, 500);
            }

        } catch (err) {
            console.error("Startup save error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to save startup. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="startup-form-container">

            <div className="startup-form-header">
                <h2>
                    {isEditing
                        ? "Edit Startup"
                        : "Create Your Startup"}
                </h2>

                <p>
                    Provide accurate information about your
                    startup so investors can understand your
                    business.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                {/* BASIC INFORMATION */}

                <section className="form-section">

                    <h3>Basic Information</h3>

                    <div className="form-grid">

                        <div className="form-field">
                            <label>
                                Startup Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter startup name"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Tagline
                            </label>

                            <input
                                type="text"
                                name="tagline"
                                value={formData.tagline}
                                onChange={handleChange}
                                placeholder="Short description"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Industry
                            </label>

                            <input
                                type="text"
                                name="industry"
                                value={formData.industry}
                                onChange={handleChange}
                                placeholder="e.g. FinTech"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Sub Industry
                            </label>

                            <input
                                type="text"
                                name="sub_industry"
                                value={formData.sub_industry}
                                onChange={handleChange}
                                placeholder="e.g. Digital Payments"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Founded Year
                            </label>

                            <input
                                type="number"
                                name="founded_year"
                                value={formData.founded_year}
                                onChange={handleChange}
                                placeholder="2024"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="City, Country"
                            />
                        </div>

                        <div className="form-field full-width">
                            <label>
                                Website
                            </label>

                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                placeholder="https://example.com"
                            />
                        </div>

                    </div>

                </section>

                {/* BUSINESS INFORMATION */}

                <section className="form-section">

                    <h3>Business Information</h3>

                    <div className="form-grid">

                        <div className="form-field full-width">
                            <label>
                                Startup Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your startup"
                                rows="4"
                            />
                        </div>

                        <div className="form-field full-width">
                            <label>
                                Problem
                            </label>

                            <textarea
                                name="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                placeholder="What problem are you solving?"
                                rows="4"
                            />
                        </div>

                        <div className="form-field full-width">
                            <label>
                                Solution
                            </label>

                            <textarea
                                name="solution"
                                value={formData.solution}
                                onChange={handleChange}
                                placeholder="How does your startup solve it?"
                                rows="4"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Business Model
                            </label>

                            <input
                                type="text"
                                name="business_model"
                                value={formData.business_model}
                                onChange={handleChange}
                                placeholder="e.g. SaaS"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Target Market
                            </label>

                            <input
                                type="text"
                                name="target_market"
                                value={formData.target_market}
                                onChange={handleChange}
                                placeholder="Target customers"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Competitors
                            </label>

                            <input
                                type="text"
                                name="competitors"
                                value={formData.competitors}
                                onChange={handleChange}
                                placeholder="Main competitors"
                            />
                        </div>

                        <div className="form-field">
                            <label>
                                Competitive Advantage
                            </label>

                            <input
                                type="text"
                                name="competitive_advantage"
                                value={formData.competitive_advantage}
                                onChange={handleChange}
                                placeholder="What makes you different?"
                            />
                        </div>

                    </div>

                </section>

                {/* METRICS */}

                <section className="form-section">

                    <h3>Startup Metrics</h3>

                    <div className="form-grid">

                        <div className="form-field">
                            <label>Startup Stage</label>

                            <input
                                type="text"
                                name="stage"
                                value={formData.stage}
                                onChange={handleChange}
                                placeholder="Pre-seed / Seed / Series A"
                            />
                        </div>

                        <div className="form-field">
                            <label>Team Size</label>

                            <input
                                type="number"
                                name="team_size"
                                value={formData.team_size}
                                onChange={handleChange}
                                placeholder="10"
                            />
                        </div>

                        <div className="form-field">
                            <label>Annual Revenue</label>

                            <input
                                type="number"
                                name="revenue"
                                value={formData.revenue}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Monthly Revenue</label>

                            <input
                                type="number"
                                name="monthly_revenue"
                                value={formData.monthly_revenue}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Revenue Growth %</label>

                            <input
                                type="number"
                                name="revenue_growth"
                                value={formData.revenue_growth}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Customers</label>

                            <input
                                type="number"
                                name="customers"
                                value={formData.customers}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Active Users</label>

                            <input
                                type="number"
                                name="active_users"
                                value={formData.active_users}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Monthly Burn</label>

                            <input
                                type="number"
                                name="monthly_burn"
                                value={formData.monthly_burn}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Runway (Months)</label>

                            <input
                                type="number"
                                name="runway"
                                value={formData.runway}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Gross Margin %</label>

                            <input
                                type="number"
                                name="gross_margin"
                                value={formData.gross_margin}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>CAC</label>

                            <input
                                type="number"
                                name="cac"
                                value={formData.cac}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>LTV</label>

                            <input
                                type="number"
                                name="ltv"
                                value={formData.ltv}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                    </div>

                </section>

                {/* FUNDING */}

                <section className="form-section">

                    <h3>Funding Information</h3>

                    <div className="form-grid">

                        <div className="form-field">
                            <label>Funding Stage</label>

                            <input
                                type="text"
                                name="funding_stage"
                                value={formData.funding_stage}
                                onChange={handleChange}
                                placeholder="Seed"
                            />
                        </div>

                        <div className="form-field">
                            <label>Funding Required</label>

                            <input
                                type="number"
                                name="funding_required"
                                value={formData.funding_required}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Amount Raised</label>

                            <input
                                type="number"
                                name="amount_raised"
                                value={formData.amount_raised}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Valuation</label>

                            <input
                                type="number"
                                name="valuation"
                                value={formData.valuation}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Equity Offered %</label>

                            <input
                                type="number"
                                name="equity_offered"
                                value={formData.equity_offered}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                        <div className="form-field">
                            <label>Minimum Investment</label>

                            <input
                                type="number"
                                name="minimum_investment"
                                value={formData.minimum_investment}
                                onChange={handleChange}
                                placeholder="0"
                            />
                        </div>

                    </div>

                </section>

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="form-success">
                        {success}
                    </div>
                )}

                <div className="form-actions">

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : isEditing
                                ? "Save Changes"
                                : "Create Startup"}
                    </button>

                </div>

            </form>

        </div>
    );
}

export default StartupForm;