import { Repository } from "typeorm";
import { User } from "../entity/User.js";
import { TokenInfos, UserLoginDto } from "../types.js";
import 'dotenv'
import bcrypt from 'bcrypt'
import { TokenServices } from "./TokenServices.js";
import { Request } from "express";

type AuthData = {
    data: string,
    status: number
}

export default class AuthService {

    private authData: AuthData = {} as AuthData
    private readonly VERIFY_INFO_RESPONSE = "Confira sua e-mail ou senha e tente novamente."

    constructor(
        private readonly userRepository: Repository<User>,
        private readonly tokenServices: TokenServices
    ) { }

    public async authenticate(userLoginDto: UserLoginDto): Promise<AuthData> {
        try {
            const emailExists = await this.userRepository.existsBy({ email: userLoginDto.email })
            if (!emailExists) {
                throw new Error(this.VERIFY_INFO_RESPONSE)
            }

            const user: User = await this.userRepository.findOneByOrFail({ email: userLoginDto.email })

            const isValidPassword = bcrypt.compare(user.password, userLoginDto.password.toString())
            if (!isValidPassword) {
                throw new Error(this.VERIFY_INFO_RESPONSE)
            }

            const claims: TokenInfos = {
                id: user.id,
                name: user.name,
                email: user.email
            }

            const token = this.tokenServices.generateToken(claims)
            this.authData.data = await token
            this.authData.status = 204
            return this.authData
        } catch (err) {
            this.authData.data = err.message
            this.authData.status = 400
            return this.authData
        }
    }

    public async logoff(req: Request): Promise<AuthData> {
        try {
            const token = await req.headers.cookie

            if (!token) {
                throw new Error("Nenhum usuário logado")
            }

            this.authData.data = token
            this.authData.status = 204
            return this.authData
        } catch (err) {
            this.authData.data = err.message
            this.authData.status = 400
            return this.authData
        }
    }
}