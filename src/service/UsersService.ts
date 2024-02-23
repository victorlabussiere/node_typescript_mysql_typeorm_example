import { Repository } from "typeorm";
import { User } from "../entity/User.js";

import bcrypt from 'bcrypt'
import { CreateUserDTO, UpdateUserDTO } from "../types.js";


type UserDataResponse = {
    data?: User | User[] | string
    status: number
}

export default class UsersService {
    response: UserDataResponse

    constructor(private userRepository: Repository<User>) { }

    public async create(createUserDto: CreateUserDTO): Promise<UserDataResponse> {
        try {
            const hashPassword = await bcrypt.hashSync(createUserDto.password, 10)

            const userExists = await this.userRepository.existsBy({ email: createUserDto.email })

            if (userExists) {
                throw new Error("This e-mail is already in use!")
            }

            const user = new User()
            user.name = createUserDto.name
            user.email = createUserDto.email
            user.phone = createUserDto.phone
            user.birthday = new Date(createUserDto.birthday)
            user.password = hashPassword

            const data = await this.userRepository.save(user)
            this.response = {
                data: data,
                status: 201
            }

            return this.response
        } catch (err) {
            this.response = {
                data: err.message,
                status: 400
            }

            return this.response
        }
    }

    public async getAll(): Promise<UserDataResponse> {
        try {
            const data = await this.userRepository.find();
            this.response = {
                data: data,
                status: 200
            }
            return this.response;
        } catch (err) {
            this.response = {
                data: err.message,
                status: 400
            }
            return this.response
        }
    }

    public async getById(id: number): Promise<UserDataResponse> {
        try {
            const data = await this.userRepository.findOneByOrFail({ id })
            this.response = {
                data: data,
                status: 200
            }

            return this.response
        } catch (err) {
            this.response = {
                data: err.message,
                status: 404
            }

            return this.response
        }
    }

    public async update(updateUserDto: UpdateUserDTO, id: number): Promise<UserDataResponse> {
        try {
            const user = await this.userRepository.findOneByOrFail({ id })
            user.name = updateUserDto.name != null ? updateUserDto.name as string : user.name
            user.email = updateUserDto.email != null ? updateUserDto.email as string : user.email
            user.birthday = updateUserDto.birthday != null ? new Date(updateUserDto.birthday as string) : user.birthday
            user.phone = updateUserDto.phone != null ? updateUserDto.phone as string : user.phone

            const data = await this.userRepository.save(user)
            this.response = {
                data: data,
                status: 200
            }

            return this.response
        } catch (err) {
            this.response = {
                data: err.message,
                status: 400
            }
            return this.response
        }
    }

    public async destroy(id: number): Promise<UserDataResponse> {
        try {
            const user = await this.userRepository.findOneByOrFail({ id })
            const data = await this.userRepository.remove(user)

            this.response = {
                data: data,
                status: 200
            }

            return this.response
        } catch (err) {
            this.response = {
                data: err.message,
                status: 400
            }
            return this.response
        }

    }
}