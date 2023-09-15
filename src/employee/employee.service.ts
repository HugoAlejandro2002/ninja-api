import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto'
import { UpdateEmployeeDto } from './dto/update-employee.dto'

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}


    async createEmployee(employee: CreateEmployeeDto){

        if ((employee.cargo == "Entrenador") || (employee.cargo == "Conserje")) {
            const newEmployee = this.employeeRepository.create(employee) 
            return this.employeeRepository.save(newEmployee)
        }
        
        return new HttpException('Solo hay 2 cargos, Conserje o Entrenador', HttpStatus.CONFLICT)
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
            return new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND)
        }

        return employeeFound
    }

    async deleteEmployee(id: number){
        const employeeFound = await this.employeeRepository.findOne({where: {id}})

        if (!employeeFound){
            return new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND)
        }

        return this.employeeRepository.delete({id})
    }

    async updateEmployee(id:  number, employee: UpdateEmployeeDto){
        const employeeFound = await this.employeeRepository.findOne({where: {id}})

        if (!employeeFound){
            return new HttpException('Empleado no encontrado', HttpStatus.NOT_FOUND)
        }

        if ((employee.cargo == "Entrenador") || (employee.cargo == "Conserje")) {
            const updateEmployee = Object.assign(employeeFound, employee)
            return this.employeeRepository.save(updateEmployee)
        }
        
        return new HttpException('Solo hay 2 cargos, Conserje o Entrenador', HttpStatus.CONFLICT)

    }
}
