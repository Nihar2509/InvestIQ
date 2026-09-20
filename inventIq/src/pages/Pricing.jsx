import "./Pricing.css";

function Pricing() {
    return (
        <main className="pricing-page">
            <div className="pricing-container">

                <div className="pricing-header">
                    <p className="pricing-label">
                        Pricing
                    </p>

                    <h1>
                        Simple pricing for growing teams
                    </h1>

                    <p>
                        Choose a plan that fits your startup
                        or investment workflow.
                    </p>
                </div>

                <div className="pricing-grid">

                    <div className="pricing-card">
                        <h2>Starter</h2>

                        <p className="pricing-description">
                            For individuals exploring
                            startup opportunities.
                        </p>

                        <div className="pricing-price">
                            Free
                        </div>

                        <ul>
                            <li>Startup discovery</li>
                            <li>Basic startup profiles</li>
                            <li>Investor marketplace access</li>
                        </ul>

                        <button>
                            Get Started
                        </button>
                    </div>

                    <div className="pricing-card featured">
                        <span className="pricing-badge">
                            Popular
                        </span>

                        <h2>Professional</h2>

                        <p className="pricing-description">
                            For investors and startups
                            building their pipeline.
                        </p>

                        <div className="pricing-price">
                            ₹999
                            <span>/month</span>
                        </div>

                        <ul>
                            <li>Advanced startup profiles</li>
                            <li>Startup discovery</li>
                            <li>Investment workflow</li>
                            <li>Detailed startup information</li>
                        </ul>

                        <button>
                            Get Started
                        </button>
                    </div>

                    <div className="pricing-card">
                        <h2>Enterprise</h2>

                        <p className="pricing-description">
                            For funds and organizations
                            managing larger investment workflows.
                        </p>

                        <div className="pricing-price">
                            Custom
                        </div>

                        <ul>
                            <li>Advanced workflows</li>
                            <li>Team collaboration</li>
                            <li>Custom requirements</li>
                        </ul>

                        <button>
                            Contact Us
                        </button>
                    </div>

                </div>

            </div>
        </main>
    );
}

export default Pricing;
