const pool = require("../config/db");

// Create a new startup
const createStartup = async (founderId, data) => {
    const query = `
        INSERT INTO startups (
            founder_id,
            name,
            logo,
            tagline,
            industry,
            sub_industry,
            founded_year,
            location,
            website,
            description,
            problem,
            solution,
            business_model,
            target_market,
            competitors,
            competitive_advantage,
            stage,
            team_size,
            revenue,
            monthly_revenue,
            revenue_growth,
            customers,
            active_users,
            monthly_burn,
            runway,
            gross_margin,
            cac,
            ltv,
            funding_stage,
            funding_required,
            amount_raised,
            valuation,
            equity_offered,
            minimum_investment,
            status
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15,
            $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25,
            $26, $27, $28, $29, $30,
            $31, $32, $33, $34, $35
        )
        RETURNING *
    `;

    const values = [
        founderId,
        data.name,
        data.logo,
        data.tagline,
        data.industry,
        data.sub_industry,
        data.founded_year,
        data.location,
        data.website,
        data.description,
        data.problem,
        data.solution,
        data.business_model,
        data.target_market,
        data.competitors,
        data.competitive_advantage,
        data.stage,
        data.team_size,
        data.revenue,
        data.monthly_revenue,
        data.revenue_growth,
        data.customers,
        data.active_users,
        data.monthly_burn,
        data.runway,
        data.gross_margin,
        data.cac,
        data.ltv,
        data.funding_stage,
        data.funding_required,
        data.amount_raised,
        data.valuation,
        data.equity_offered,
        data.minimum_investment,
        "DRAFT"
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// Get startup belonging to a specific founder
const getStartupByFounder = async (founderId) => {
    const query = `
        SELECT *
        FROM startups
        WHERE founder_id = $1
        LIMIT 1
    `;

    const result = await pool.query(query, [founderId]);

    return result.rows[0];
};


// Update founder's startup
const updateStartup = async (founderId, data) => {
    const query = `
        UPDATE startups
        SET
            name = $1,
            logo = $2,
            tagline = $3,
            industry = $4,
            sub_industry = $5,
            founded_year = $6,
            location = $7,
            website = $8,
            description = $9,
            problem = $10,
            solution = $11,
            business_model = $12,
            target_market = $13,
            competitors = $14,
            competitive_advantage = $15,
            stage = $16,
            team_size = $17,
            revenue = $18,
            monthly_revenue = $19,
            revenue_growth = $20,
            customers = $21,
            active_users = $22,
            monthly_burn = $23,
            runway = $24,
            gross_margin = $25,
            cac = $26,
            ltv = $27,
            funding_stage = $28,
            funding_required = $29,
            amount_raised = $30,
            valuation = $31,
            equity_offered = $32,
            minimum_investment = $33,
            updated_at = CURRENT_TIMESTAMP
        WHERE founder_id = $34
        RETURNING *
    `;

    const values = [
        data.name,
        data.logo,
        data.tagline,
        data.industry,
        data.sub_industry,
        data.founded_year,
        data.location,
        data.website,
        data.description,
        data.problem,
        data.solution,
        data.business_model,
        data.target_market,
        data.competitors,
        data.competitive_advantage,
        data.stage,
        data.team_size,
        data.revenue,
        data.monthly_revenue,
        data.revenue_growth,
        data.customers,
        data.active_users,
        data.monthly_burn,
        data.runway,
        data.gross_margin,
        data.cac,
        data.ltv,
        data.funding_stage,
        data.funding_required,
        data.amount_raised,
        data.valuation,
        data.equity_offered,
        data.minimum_investment,
        founderId
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};


// Publish startup
const publishStartup = async (founderId) => {
    const query = `
        UPDATE startups
        SET
            status = 'PUBLISHED',
            updated_at = CURRENT_TIMESTAMP
        WHERE founder_id = $1
        RETURNING *
    `;

    const result = await pool.query(query, [founderId]);

    return result.rows[0];
};


// Pause startup
const pauseStartup = async (founderId) => {
    const query = `
        UPDATE startups
        SET
            status = 'PAUSED',
            updated_at = CURRENT_TIMESTAMP
        WHERE founder_id = $1
        RETURNING *
    `;

    const result = await pool.query(query, [founderId]);

    return result.rows[0];
};


// Get startup by ID
const getStartupById = async (id) => {
    const query = `
        SELECT *
        FROM startups
        WHERE id = $1
    `;

    const result = await pool.query(query, [id]);

    return result.rows[0];
};


module.exports = {
    createStartup,
    getStartupByFounder,
    updateStartup,
    publishStartup,
    pauseStartup,
    getStartupById
};