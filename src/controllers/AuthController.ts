import { Request, Response } from "express";
import AuthService from "../service/AuthService.js";
import { UserLoginDto } from "../types.js";

export default class AuthControllers {

    constructor(private readonly authService: AuthService) { }

    public async login(req: Request<{}, {}, UserLoginDto>, res: Response): Promise<Response> {
        const result = await this.authService.authenticate(req.body)
        return res.status(result.status).cookie('token', result.data, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000,
        });
    }
}