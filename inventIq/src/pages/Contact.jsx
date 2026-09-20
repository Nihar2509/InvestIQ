import "./Contact.css";

function Contact() {
    return (
        <main className="contact-page">
            <div className="contact-container">

                <div className="contact-header">
                    <p className="contact-label">
                        Contact
                    </p>

                    <h1>
                        Get in touch with InvestIQ
                    </h1>

                    <p>
                        Have a question, suggestion, or need
                        help with the platform? Send us a message.
                    </p>
                </div>

                <div className="contact-card">

                    <div className="contact-info">
                        <h2>
                            Contact Us
                        </h2>

                        <p>
                            We are happy to hear from startups,
                            investors, and anyone interested in
                            InvestIQ.
                        </p>

                        <div className="contact-detail">
                            <strong>Email</strong>
                            <span>support@investiq.com</span>
                        </div>

                        <div className="contact-detail">
                            <strong>Response Time</strong>
                            <span>Within 1–2 business days</span>
                        </div>
                    </div>

                    <form className="contact-form">

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                rows="5"
                                placeholder="Write your message"
                            ></textarea>
                        </div>

                        <button type="button">
                            Send Message
                        </button>

                    </form>

                </div>

            </div>
        </main>
    );
}

export default Contact;