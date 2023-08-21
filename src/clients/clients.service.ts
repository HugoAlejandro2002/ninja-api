import { Injectable,HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clients } from './clients.entity';
import { Repository } from 'typeorm';
import {CreateClientsDto} from './dto/create-clients.dto'
import {UpdateClientsDto} from './dto/update-clients.dto'

@Injectable()
export class ClientsService {
    constructor(@InjectRepository(Clients) private clientRepository: Repository<Clients>){}


    async createClients(client: CreateClientsDto){

        const clientFound = await this.clientRepository.findOne({
            where: {
                clientFirstName: client.clientFirstName 
                //clientLastName: client.clientLastName
            }
        })

        if (clientFound){
            return new HttpException('El cliente ya existe', HttpStatus.CONFLICT)
        }

        const newClient = this.clientRepository.create(client) 
        return this.clientRepository.save(newClient)
    }

    getClients(){
        return this.clientRepository.find()
    }

    async getClient(id: number){
        const clientFound = await this.clientRepository.findOne({
            where:{
                id
            }
        })

        if (!clientFound){
            return new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND)
        }

        return clientFound
    }

    async deleteClients(id: number){
        const clientFound = await this.clientRepository.findOne({where: {id}})

        if (!clientFound){
            return new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND)
        }

        return this.clientRepository.delete({id})
    }

    async updateClients(id:  number, client: UpdateClientsDto){
        const clientFound = await this.clientRepository.findOne({where: {id}})
        
        if (!clientFound){
            return new HttpException('Cliente no encontrado', HttpStatus.NOT_FOUND)
        }

        const updateClient = Object.assign(clientFound, client)
        return this.clientRepository.save(updateClient)

    }
}
