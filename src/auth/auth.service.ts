import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor (private readonly userService: UserService, private jwtService: JwtService){}
    async validateUser(username: string, password: string){
        const user = await this.userService.getUserByName(username)

        if (user && (await password == user.password)){
            const {password, ...result} = user;
            return result 
        }
        return null
    }

    async login(user:User){
        const payload = {
            username: user.username
        }
            return{
                ...user,
                accessToken: this.jwtService.sign(payload)
            }
    }
}

