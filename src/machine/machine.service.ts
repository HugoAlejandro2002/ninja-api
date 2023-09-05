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

    }


}
