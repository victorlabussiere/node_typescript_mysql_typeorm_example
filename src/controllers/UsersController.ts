import { Request, Response } from "express";
import UsersService from "../service/UsersService.js";
import { CreateUserDTO, UpdateUserDTO } from "../types.js";

export default class UsersController {

    constructor(private usersService: UsersService) { }

    public async store(req: Request<{}, {}, CreateUserDTO>, res: Response): Promise<Response> {
        const result = await this.usersService.create(req.body)
        return res.status(result.status).json(result.data)
    }

    public async list(req: Request, res: Response): Promise<Response> {
        const result = await this.usersService.getAll()
        return res.status(result.status).json(result.data)
    }

    public async index(req: Request<{ id: number }>, res): Promise<Response> {
        const result = await this.usersService.getById(req.params.id)
        return res.status(result.status).json(result.data)
    }

    public async update(req: Request<{ id: number }, {}, UpdateUserDTO>, res: Response): Promise<Response> {
        const result = await this.usersService.update(req.body, req.params.id)
        return res.status(result.status).json(result.data)
    }

    public async destroy(req: Request<{ id: number }>, res: Response): Promise<Response> {
        const result = await this.usersService.destroy(req.params.id)
        return res.status(result.status).json(result.data)
    }
}