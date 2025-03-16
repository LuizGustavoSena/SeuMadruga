import 'dotenv/config';

const config = {
    production: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: `${process.env.HOST_DB}`,
            user: `${process.env.USER_DB}`,
            password: `${process.env.PASSWORD_DB}`,
            database: `${process.env.NAME_DB}`
        },
        migrations: {
            directory: 'src/infrastructure/database/migrations'
        }
    },
    development: {
        client: 'sqlite3',
        connection: {
            filename: ":memory:",
        },
        useNullAsDefault: true,
        migrations: {
            directory: 'src/infrastructure/database/migrations'
        }
    }
}
// @ts-expect-error
export default config[process.env.NODE_ENV];