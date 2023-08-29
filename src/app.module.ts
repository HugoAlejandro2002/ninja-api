import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cjeftdenk9qs73afjpe0-a.oregon-postgres.render.com',
      port: 5432,
      username: 'root',
      password: '6dUUQCK55yoJvmu2nbfuzwwGhkkIVERo',
      database: 'auxiliatron_96mq',
      ssl: { rejectUnauthorized: false },
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    UserModule,
    EmployeeModule,
    ClientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
