let startups = [];
let nextStartupId = 1;

// Create startup
const createStartup = async (founderId, data) => {
    const startup = {
        id: nextStartupId++,
        founder_id: founderId,

        name: data.name,
        logo: data.logo || "",
        tagline: data.tagline || "",

        industry: data.industry || "",
        sub_industry: data.sub_industry || "",
        founded_year: data.founded_year || null,
        location: data.location || "",
        website: data.website || "",

        description: data.description || "",
        problem: data.problem || "",
        solution: data.solution || "",
        business_model: data.business_model || "",
        target_market: data.target_market || "",
        competitors: data.competitors || "",
        competitive_advantage: data.competitive_advantage || "",

        stage: data.stage || "",
        team_size: data.team_size || null,

        revenue: data.revenue || 0,
        monthly_revenue: data.monthly_revenue || 0,
        revenue_growth: data.revenue_growth || 0,

        customers: data.customers || 0,
        active_users: data.active_users || 0,

        monthly_burn: data.monthly_burn || 0,
        runway: data.runway || 0,
        gross_margin: data.gross_margin || 0,
        cac: data.cac || 0,
        ltv: data.ltv || 0,

        funding_stage: data.funding_stage || "",
        funding_required: data.funding_required || 0,
        amount_raised: data.amount_raised || 0,
        valuation: data.valuation || 0,
        equity_offered: data.equity_offered || 0,
        minimum_investment: data.minimum_investment || 0,

        status: "DRAFT",

        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    startups.push(startup);

    return startup;
};


// Get founder's startup
const getStartupByFounder = async (founderId) => {
    return startups.find(
        (startup) => Number(startup.founder_id) === Number(founderId)
    );
};


// Update founder's startup
const updateStartup = async (founderId, data) => {
    const startup = startups.find(
        (startup) => Number(startup.founder_id) === Number(founderId)
    );

    if (!startup) {
        return null;
    }

    Object.keys(data).forEach((key) => {
        if (key !== "status" && key !== "founder_id" && key !== "id") {
            startup[key] = data[key];
        }
    });

    startup.updated_at = new Date().toISOString();

    return startup;
};


// Publish startup
const publishStartup = async (founderId) => {
    const startup = startups.find(
        (startup) => Number(startup.founder_id) === Number(founderId)
    );

    if (!startup) {
        return null;
    }

    startup.status = "PUBLISHED";
    startup.updated_at = new Date().toISOString();

    return startup;
};


// Pause startup
const pauseStartup = async (founderId) => {
    const startup = startups.find(
        (startup) => Number(startup.founder_id) === Number(founderId)
    );

    if (!startup) {
        return null;
    }

    startup.status = "PAUSED";
    startup.updated_at = new Date().toISOString();

    return startup;
};


// Get startup by ID
const getStartupById = async (id) => {
    return startups.find(
        (startup) => Number(startup.id) === Number(id)
    );
};


// Get all published startups
const getAllPublishedStartups = async () => {
    return startups.filter(
        (startup) => startup.status === "PUBLISHED"
    );
};


module.exports = {
    createStartup,
    getStartupByFounder,
    updateStartup,
    publishStartup,
    pauseStartup,
    getStartupById,
    getAllPublishedStartups
};