import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Clients } from './clients.entity';
import { ClientsController } from './clients.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Clients])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
