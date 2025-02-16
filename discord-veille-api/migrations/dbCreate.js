const pool = require("../config/db");

async function createTables() {
    try {
        const connection = await pool.getConnection();

        await connection.query(`
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(50) PRIMARY KEY,
                username VARCHAR(100) NOT NULL,
                role VARCHAR(50) NOT NULL
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS moderation_logs (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id VARCHAR(50),
                action VARCHAR(50),
                reason TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        await connection.query(`
            CREATE TABLE IF NOT EXISTS alerts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                source VARCHAR(255),
                content TEXT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ Tables créées avec succès !");
        connection.release();
    } catch (err) {
        console.error("❌ Erreur lors de la création des tables :", err);
    }
}

createTables();