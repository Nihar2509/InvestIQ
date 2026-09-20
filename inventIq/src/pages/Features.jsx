import "./Features.css";

function Features() {
    return (
        <main className="features-page">
            <div className="features-container">

                <div className="features-header">
                    <p className="features-label">
                        Features
                    </p>

                    <h1>
                        Everything you need to explore
                        and evaluate startups
                    </h1>

                    <p>
                        InvestIQ brings startup information
                        and investor discovery together in
                        one simple platform.
                    </p>
                </div>

                <div className="features-grid">

                    <div className="feature-card">
                        <h2>
                            Startup Profiles
                        </h2>

                        <p>
                            Startups can create structured
                            profiles with business, financial,
                            traction, and fundraising information.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h2>
                            Investor Marketplace
                        </h2>

                        <p>
                            Investors can discover published
                            startups and explore their business
                            information.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h2>
                            Startup Details
                        </h2>

                        <p>
                            Review important startup information
                            including business details, traction,
                            financials, and funding requirements.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h2>
                            Secure Authentication
                        </h2>

                        <p>
                            Separate startup and investor access
                            keeps platform functionality organized
                            according to user roles.
                        </p>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default Features;