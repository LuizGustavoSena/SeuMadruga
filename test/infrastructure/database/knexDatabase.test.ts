import { faker } from "@faker-js/faker/.";
import KnexDatabase from "@src/infrastructure/database/knex";

const sut: KnexDatabase = new KnexDatabase(faker.database.column());

describe('KnexDatabase', () => {
    beforeAll(async () => {
        await sut.db.migrate.latest();
    });

    afterAll(async () => {
        await sut.db.destroy();
    });
});