export type EncodeProps = {
    id: number,
    email: string,
    name: string
}

export interface Jwt {
    encode(params: EncodeProps): string
}