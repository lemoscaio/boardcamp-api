import pg from "pg"
import dotenv from "dotenv"
dotenv.config()

const { Pool } = pg

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const db = new Pool(databaseConfig)

// const db = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: process.env.POSTGRES_USERNAME,
//   password: process.env.POSTGRES_PASSWORD,
//   database: "boardcamp",
// })

export default db
