import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { Employee } from './employee.entity';
import { EmployeeController } from './employee.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Employee])],
    controllers: [EmployeeController],
    providers: [EmployeeService]
})
export class EmployeeModule {}
