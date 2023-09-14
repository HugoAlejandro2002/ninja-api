import { Module } from '@nestjs/common';
import { MachineService } from './machine.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Machine } from './machine.entity';
import { MachineController } from './machine.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Machine])],
    controllers: [MachineController],
    providers: [MachineService]
})
export class MachineModule {}
