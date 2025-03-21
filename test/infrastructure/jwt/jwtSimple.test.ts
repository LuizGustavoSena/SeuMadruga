import JwtSimpleJwt from "@src/infrastructure/jwt/jwtSimple";
import { makeJwt } from "@test/domain/mocks/insertJwt";

const sut = new JwtSimpleJwt();

describe('JwtSimpleJwt', () => {
    test('Shoulde be convert to jwt', () => {
        const request = makeJwt();

        const response = sut.encode(request);

        expect(response).not.toContain(request.email);
        expect(response).not.toContain(String(request.id));
        expect(response).not.toContain(request.name);
    })
})