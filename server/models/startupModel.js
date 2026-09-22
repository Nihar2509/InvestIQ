const pool = require("../config/db");

const createStartup = async (founderId, data) => {
    const result = await pool.query(
        `INSERT INTO startups (
            founder_id, name, logo, tagline, industry, sub_industry,
            founded_year, location, website, description, problem,
            solution, business_model, target_market, competitors,
            competitive_advantage, stage, team_size, revenue,
            monthly_revenue, revenue_growth, customers, active_users,
            monthly_burn, runway, gross_margin, cac, ltv,
            funding_stage, funding_required, amount_raised, valuation,
            equity_offered, minimum_investment
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,
            $11,$12,$13,$14,$15,$16,$17,$18,$19,$20,
            $21,$22,$23,$24,$25,$26,$27,$28,$29,$30,
            $31,$32,$33,$34
        )
        RETURNING *`,
        [
            founderId,
            data.name,
            data.logo || "",
            data.tagline || "",
            data.industry || "",
            data.sub_industry || "",
            data.founded_year || null,
            data.location || "",
            data.website || "",
            data.description || "",
            data.problem || "",
            data.solution || "",
            data.business_model || "",
            data.target_market || "",
            data.competitors || "",
            data.competitive_advantage || "",
            data.stage || "",
            data.team_size || null,
            data.revenue || 0,
            data.monthly_revenue || 0,
            data.revenue_growth || 0,
            data.customers || 0,
            data.active_users || 0,
            data.monthly_burn || 0,
            data.runway || 0,
            data.gross_margin || 0,
            data.cac || 0,
            data.ltv || 0,
            data.funding_stage || "",
            data.funding_required || 0,
            data.amount_raised || 0,
            data.valuation || 0,
            data.equity_offered || 0,
            data.minimum_investment || 0
        ]
    );

    return result.rows[0];
};

const getStartupByFounder = async (founderId) => {
    const result = await pool.query(
        "SELECT * FROM startups WHERE founder_id = $1",
        [founderId]
    );

    return result.rows[0] || null;
};

const updateStartup = async (founderId, data) => {
    const fields = Object.keys(data).filter(
        key => key !== "id" && key !== "founder_id" && key !== "status"
    );

    if (!fields.length) {
        return getStartupByFounder(founderId);
    }

    const values = fields.map(field => data[field]);
    const updates = fields.map(
        (field, index) => `${field} = $${index + 1}`
    );

    values.push(founderId);

    const result = await pool.query(
        `UPDATE startups
         SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
         WHERE founder_id = $${values.length}
         RETURNING *`,
        values
    );

    return result.rows[0] || null;
};

const publishStartup = async (founderId) => {
    const result = await pool.query(
        `UPDATE startups
         SET status = 'PUBLISHED', updated_at = CURRENT_TIMESTAMP
         WHERE founder_id = $1
         RETURNING *`,
        [founderId]
    );

    return result.rows[0] || null;
};

const pauseStartup = async (founderId) => {
    const result = await pool.query(
        `UPDATE startups
         SET status = 'PAUSED', updated_at = CURRENT_TIMESTAMP
         WHERE founder_id = $1
         RETURNING *`,
        [founderId]
    );

    return result.rows[0] || null;
};

const getStartupById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM startups WHERE id = $1",
        [id]
    );

    return result.rows[0] || null;
};

const getAllPublishedStartups = async () => {
    const result = await pool.query(
        `SELECT * FROM startups
         WHERE status = 'PUBLISHED'
         ORDER BY created_at DESC`
    );

    return result.rows;
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