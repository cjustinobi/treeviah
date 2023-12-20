export default () => ({
  port: process.env.SERVER_PORT,
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    port: process.env.DATABASE_PORT,
    sychronize: process.env.DB_SYNCHRONIZE,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
})
