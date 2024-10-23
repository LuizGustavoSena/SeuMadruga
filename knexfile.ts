import 'dotenv/config';

module.exports = {
    test: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: 'localhost',
            user: 'postgres',
            password: `${process.env.PASSWORD_DB}`,
            database: `${process.env.NAME_DB}`
        },
        migrations: {
            directory: 'src/migrations'
        }
    }
}