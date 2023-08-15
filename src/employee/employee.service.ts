import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import {CreateEmployeeDto} from './dto/create-employee.dto'
import {UpdateEmployeeDto} from './dto/update-employee.dto'
@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}


    async createEmployee(employee: CreateEmployeeDto){

        const employeeFound = await this.employeeRepository.findOne({
            where: {
                employeename: employee.employeename
            }
        })

        if (employeeFound){
            return new HttpException('El usuario ya existe', HttpStatus.CONFLICT)
        }

        const newEmployee = this.employeeRepository.create(employee) 
        return this.employeeRepository.save(newEmployee)
    }

    getEmployees(){
        return this.employeeRepository.find()
    }

    async getEmployee(id: number){
        const employeeFound = await this.employeeRepository.findOne({
            where:{
                id
            }
        })

        if (!employeeFound){
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }

        return employeeFound
    }

    async deleteEmployee(id: number){
        const employeeFound = await this.employeeRepository.findOne({where: {id}})

        if (!employeeFound){
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }

        return this.employeeRepository.delete({id})
    }

    async updateEmployee(id:  number, employee: UpdateEmployeeDto){
        const userFound = await this.employeeRepository.findOne({where: {id}})

        if (!userFound){
            return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
        }

        const updateUser = Object.assign(userFound, employee)
        return this.employeeRepository.save(updateUser)

    }
}
