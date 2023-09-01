import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Machine } from './machine.entity';
import { Repository } from 'typeorm';
import { CreateMachineDto } from './dto/create-machine.dto'
import { UpdateMachineDto } from './dto/update-machine.dto'

@Injectable()
export class MachineService {
    
    constructor(@InjectRepository(Machine) private machineRepository: Repository<Machine>){}


    async createMachine(machine: CreateMachineDto){
        const newMachine = this.machineRepository.create(machine) 
        return this.machineRepository.save(newMachine)

//        const employeeFound = await this.machineRepository.findOne({
//            where: {
//                CI: machine.CI,
//            }
//        })

//        if (employeeFound){
//            return new HttpException('El empleado ya existe', HttpStatus.CONFLICT)
//        }
//        if ((machine.cargo == "Entrenador") || (machine.cargo == "Conserje")) {
//            const newEmployee = this.machineRepository.create(machine) 
//            return this.machineRepository.save(newEmployee)
//        }
        
//        return new HttpException('Solo hay 2 cargos, Conserje o Entrenador', HttpStatus.CONFLICT)
    }

    getMachines(){
        return this.machineRepository.find()
    }

    async getMachine(id: number){
        const machineFound = await this.machineRepository.findOne({
            where:{
                id
            }
        })

        if (!machineFound){
            return new HttpException('Maquina no encontrada', HttpStatus.NOT_FOUND)
        }

        return machineFound
    }

    async deleteMachine(id: number){
        const machineFound = await this.machineRepository.findOne({where: {id}})

        if (!machineFound){
            return new HttpException('Maquina no encontrada', HttpStatus.NOT_FOUND)
        }

        return this.machineRepository.delete({id})
    }

    async updateMachine(id:  number, machine: UpdateMachineDto){

        const MachineFound = await this.machineRepository.findOne({where: {id}})
        if (!MachineFound){
            return new HttpException('Maquina no encontrada', HttpStatus.NOT_FOUND)
        }

        const updateEmployee = Object.assign(MachineFound, machine)
        return this.machineRepository.save(updateEmployee)

//        if ((machine.cargo == "Entrenador") || (machine.cargo == "Conserje")) {
//            const updateEmployee = Object.assign(MachineFound, machine)
//            return this.machineRepository.save(updateEmployee)
//        }
        
//        return new HttpException('Solo hay 2 cargos, Conserje o Entrenador', HttpStatus.CONFLICT)

    }


}
