import express, { Request, Response } from 'express'
import { MySQLDataSource } from '../config/MySQLConnection.js'
import { User } from '../entity/User.js'
import UsersService from '../service/UsersService.js'
import { CreateUserDTO, UpdateUserDTO } from '../types.js'
import UsersController from './UsersController.js'

const UserRoutes = express.Router()
const userService = new UsersService(MySQLDataSource.getRepository(User))
const userController = new UsersController(userService)

UserRoutes.get('/', async (req, res) => userController.list(req, res))
UserRoutes.get('/:id', async (req: Request<{ id: number }>, res) => userController.index(req, res))
UserRoutes.post('/', async (req: Request<{}, {}, CreateUserDTO>, res: Response) => userController.store(req, res))
UserRoutes.patch('/:id', async (req: Request<{ id: number }, {}, UpdateUserDTO>, res: Response) => userController.update(req, res))
UserRoutes.delete('/:id', async (req: Request<{ id: number }>, res: Response) => userController.destroy(req, res))

export default UserRoutes