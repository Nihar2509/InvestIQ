
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/api";
import StartupForm from "./StartupForm";
import "./StartupDashboard.css";

function StartupDashboard() {
    const { user } = useAuth();

    const [startup, setStartup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(false);
    const [publishing, setPublishing] = useState(false);

    useEffect(() => {
        const fetchStartup = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await API.get("/startups/me");

                setStartup(response.data.data);
            } catch (err) {
                console.error("Fetch startup error:", err);

                if (err.response?.status === 404) {
                    setStartup(null);
                } else {
                    setError(
                        err.response?.data?.message ||
                        "Failed to load startup."
                    );
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStartup();
    }, []);

    const handlePublish = async () => {
        try {
            setPublishing(true);
            setError("");

            const response = await API.post(
                "/startups/me/publish"
            );

            setStartup(response.data.data);

        } catch (err) {
            console.error("Publish startup error:", err);

            setError(
                err.response?.data?.message ||
                "Failed to publish startup."
            );
        } finally {
            setPublishing(false);
        }
    };

    if (loading) {
        return (
            <main className="startup-dashboard">
                <div className="dashboard-loading">
                    Loading startup...
                </div>
            </main>
        );
    }

    return (
        <main className="startup-dashboard">

            <div className="dashboard-container">

                <div className="dashboard-header">

                    <div>
                        <p className="dashboard-label">
                            Founder Dashboard
                        </p>

                        <h1>
                            Welcome, {user?.name}
                        </h1>

                        <p className="dashboard-subtitle">
                            Manage your startup information and
                            prepare your profile for investors.
                        </p>
                    </div>

                    {startup && (
                        <div className="startup-status">
                            {startup.status}
                        </div>
                    )}

                </div>

                {error && (
                    <div className="dashboard-error">
                        {error}
                    </div>
                )}

                {startup ? (
                    <>
                        {!editing && (
                            <section className="startup-overview">

                                <div className="overview-header">

                                    <div>
                                        <p className="overview-label">
                                            Your Startup
                                        </p>

                                        <h2>
                                            {startup.name}
                                        </h2>

                                        {startup.tagline && (
                                            <p className="startup-tagline">
                                                {startup.tagline}
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        className="edit-button"
                                        onClick={() =>
                                            setEditing(true)
                                        }
                                    >
                                        Edit Startup
                                    </button>

                                </div>

                                <div className="startup-details">

                                    <div className="detail-item">
                                        <span>
                                            Industry
                                        </span>

                                        <strong>
                                            {startup.industry ||
                                                "Not added"}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>
                                            Location
                                        </span>

                                        <strong>
                                            {startup.location ||
                                                "Not added"}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>
                                            Stage
                                        </span>

                                        <strong>
                                            {startup.stage ||
                                                "Not added"}
                                        </strong>
                                    </div>

                                    <div className="detail-item">
                                        <span>
                                            Team Size
                                        </span>

                                        <strong>
                                            {startup.team_size ||
                                                "Not added"}
                                        </strong>
                                    </div>

                                </div>

                                <div className="startup-description">

                                    <span>
                                        Description
                                    </span>

                                    <p>
                                        {startup.description ||
                                            "No description added yet."}
                                    </p>

                                </div>

                                {startup.status !== "PUBLISHED" && (
                                    <div className="publish-section">

                                        <div>
                                            <h3>
                                                Ready to go public?
                                            </h3>

                                            <p>
                                                Publish your startup profile
                                                so investors can discover it
                                                in the marketplace.
                                            </p>
                                        </div>

                                        <button
                                            className="publish-button"
                                            onClick={handlePublish}
                                            disabled={publishing}
                                        >
                                            {publishing
                                                ? "Publishing..."
                                                : "Publish Startup"}
                                        </button>

                                    </div>
                                )}

                                {startup.status === "PUBLISHED" && (
                                    <div className="published-message">
                                        Your startup profile is currently
                                        visible to investors.
                                    </div>
                                )}

                            </section>
                        )}

                        {editing && (
                            <section className="edit-section">

                                <button
                                    className="back-button"
                                    onClick={() =>
                                        setEditing(false)
                                    }
                                >
                                    ← Back to Overview
                                </button>

                                <StartupForm
                                    existingStartup={startup}
                                    onSaved={(updatedStartup) => {
                                        setStartup(updatedStartup);
                                        setEditing(false);
                                    }}
                                />

                            </section>
                        )}
                    </>
                ) : (
                    <StartupForm
                        onSaved={(createdStartup) => {
                            setStartup(createdStartup);
                        }}
                    />
                )}

            </div>

        </main>
    );
}

export default StartupDashboard;
