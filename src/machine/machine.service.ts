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

        if ((machine.machineName == "Trotadora" || 
        machine.machineName == "Maquina Smith" || 
        machine.machineName == "Maquina de poleas multifuncional"||
        machine.machineName == "Bici Eliptica" || 
        machine.machineName == "Prensa de pierna"|| 
        machine.machineName == "Maquina de press banca") && 
        (machine.machineBrand == "AFW" || 
        machine.machineBrand == "All Free Weight"||
        machine.machineBrand == "Adidas" || 
        machine.machineBrand == "Assault Fitness"||
        machine.machineBrand == "UFC" || 
        machine.machineBrand == "BH Hi Power")){
            const newMachine = this.machineRepository.create(machine) 
                return this.machineRepository.save(newMachine)
        }

        return new HttpException('Nombre o marca de maquina equivocado', HttpStatus.CONFLICT)
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
        
        if ((machine.machineName == "Trotadora" || 
        machine.machineName == "Maquina Smith" || 
        machine.machineName == "Maquina de poleas multifuncional"||
        machine.machineName == "Bici Eliptica" || 
        machine.machineName == "Prensa de pierna"|| 
        machine.machineName == "Maquina de press banca") && 
        (machine.machineBrand == "AFW" || 
        machine.machineBrand == "All Free Weight"||
        machine.machineBrand == "Adidas" || 
        machine.machineBrand == "Assault Fitness"||
        machine.machineBrand == "UFC" || 
        machine.machineBrand == "BH Hi Power")){
            const updateEmployee = Object.assign(MachineFound, machine)
            return this.machineRepository.save(updateEmployee)
        }
        return new HttpException('Nombre o marca de maquina equivocado', HttpStatus.CONFLICT)
    }
}
