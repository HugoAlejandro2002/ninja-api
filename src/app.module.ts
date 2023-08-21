import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hola1234',
      database: 'prueba',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    UserModule,
    EmployeeModule,
    ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
