CREATE TABLE IF NOT EXISTS startups (
    id SERIAL PRIMARY KEY,

    founder_id INTEGER NOT NULL,

    name VARCHAR(150) NOT NULL,
    logo TEXT,
    tagline VARCHAR(255),

    industry VARCHAR(100),
    sub_industry VARCHAR(100),
    founded_year INTEGER,
    location VARCHAR(150),
    website TEXT,

    description TEXT,
    problem TEXT,
    solution TEXT,
    business_model TEXT,
    target_market TEXT,
    competitors TEXT,
    competitive_advantage TEXT,

    stage VARCHAR(50),
    team_size INTEGER,

    revenue NUMERIC(15,2),
    monthly_revenue NUMERIC(15,2),
    revenue_growth NUMERIC(8,2),

    customers INTEGER,
    active_users INTEGER,

    monthly_burn NUMERIC(15,2),
    runway NUMERIC(8,2),
    gross_margin NUMERIC(8,2),
    cac NUMERIC(15,2),
    ltv NUMERIC(15,2),

    funding_stage VARCHAR(50),
    funding_required NUMERIC(15,2),
    amount_raised NUMERIC(15,2),
    valuation NUMERIC(15,2),
    equity_offered NUMERIC(8,2),
    minimum_investment NUMERIC(15,2),

    status VARCHAR(20) NOT NULL DEFAULT 'DRAFT',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_startup_founder
        FOREIGN KEY (founder_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT startup_status_check
        CHECK (status IN ('DRAFT', 'PUBLISHED', 'PAUSED')),

    CONSTRAINT unique_founder_startup
        UNIQUE (founder_id)
);