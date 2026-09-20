import "./About.css";

function About() {
    return (
        <main className="about-page">
            <div className="about-container">

                <div className="about-header">
                    <p className="about-label">
                        About InvestIQ
                    </p>

                    <h1>
                        Making startup investment
                        decisions more informed
                    </h1>

                    <p>
                        InvestIQ brings startup information,
                        fundraising data, and investment
                        discovery into one platform.
                    </p>
                </div>

                <section className="about-section">
                    <h2>
                        Our Mission
                    </h2>

                    <p>
                        InvestIQ aims to simplify the process
                        of connecting startups with investors
                        by providing a structured platform for
                        discovering and evaluating startups.
                    </p>
                </section>

                <section className="about-section">
                    <h2>
                        What We Do
                    </h2>

                    <div className="about-grid">

                        <div className="about-card">
                            <h3>
                                For Startups
                            </h3>

                            <p>
                                Create and publish a structured
                                startup profile containing your
                                business, traction, financial,
                                and fundraising information.
                            </p>
                        </div>

                        <div className="about-card">
                            <h3>
                                For Investors
                            </h3>

                            <p>
                                Discover published startups and
                                review important business and
                                financial information from one
                                platform.
                            </p>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
}

export default About;