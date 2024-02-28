import express from 'express'
import AuthService from '../service/AuthService.js'
import { MySQLDataSource } from '../config/MySQLConnection.js'
import { User } from '../entity/User.js'
import { TokenServices } from '../service/TokenServices.js'
import AuthControllers from '../controllers/AuthController.js'

const AuthRoutes = express.Router()
const tokenService = new TokenServices()
const authServices: AuthService = new AuthService(MySQLDataSource.getRepository(User), tokenService)
const authController: AuthControllers = new AuthControllers(authServices)

AuthRoutes.post('/login', (req, res) => authController.login(req, res))
AuthRoutes.post('/logoff', (req, res) => authController.logoff(req, res))

export default AuthRoutes