import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtModule} from '@nestjs/jwt/dist';
import { LocalStrategy } from './strategies/local-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Profile } from 'src/user/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Profile]),PassportModule, ConfigModule, JwtModule.register({
    secret: '${process.env.jwt_secret}', signOptions:{expiresIn: "86400h"}
  })],
  providers: [AuthService, UserService, LocalStrategy, UserService],
  controllers: [AuthController],
})
export class AuthModule {}