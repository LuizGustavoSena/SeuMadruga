import 'dotenv/config';

const config = {
    test: {
        client: 'pg',
        version: '9.6',
        connection: {
            host: `${process.env.HOST_DB}`,
            user: `${process.env.USER_DB}`,
            password: `${process.env.PASSWORD_DB}`,
            database: `${process.env.NAME_DB}`
        },
        migrations: {
            directory: 'src/migrations'
        },
        seeds: {
            directory: 'src/seeds'
        }
    }
}

export default config['test'];