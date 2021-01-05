module.exports = {
    port: process.env.PORT || 8081,
    db: {
        database: process.env.DB_NAME || "QAEngine",
        user: process.env.DB_USER || "QAEngine",
        password: process.env.DB_PASS || "QAEngine",
        options: {
            dialect: process.env.DIALECT || "sqlite",
            host: process.env.HOST || "localhost",
            storage: "./QAEngine.sqlite",

        }
    },

    authentication: {
        jwtSecret: process.env.JWT_SECRET || "secret"
    }
}