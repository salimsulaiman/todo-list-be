require("dotenv").config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  test: {
    username: "sql12621380",
    password: "4THGwzlpUQ",
    database: "sql12621380",
    host: "sql12.freemysqlhosting.net",
    dialect: "mysql",
  },
  production: {
    username: "sql12621380",
    password: "4THGwzlpUQ",
    database: "sql12621380",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
