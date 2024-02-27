import 'dotenv'
import * as jose from 'jose'
import { TokenInfos } from '../types.js'

export class TokenServices {
    private readonly secret: string = process.env.JWT_SECRET
    private readonly alg: string = process.env.JWT_ALG

    constructor() { }

    public async generateToken({ id, name, email }: TokenInfos): Promise<string> {
        const secret = new TextEncoder().encode(this.secret)

        const token = new jose.SignJWT()
            .setProtectedHeader({ alg: this.alg })
            .setIssuer(id.toString())
            .setAudience(email)
            .setSubject(name)
            .sign(secret)

        return await token
    }
}