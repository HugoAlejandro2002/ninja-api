import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateClientsDto } from './dto/create-clients.dto';
import { ClientsService} from './clients.service';
import { Clients } from './clients.entity';
import { UpdateClientsDto } from './dto/update-clients.dto';

@Controller('clients')
export class ClientsController {
    constructor(private clientService: ClientsService){}

    @Get()
    getClients(): Promise<Clients[]>{
        return this.clientService.getClients();
    }

    @Get(':id')
    getClient(@Param('id', ParseIntPipe) id: number){
        return this.clientService.getClient(id);
    }

    @Post()
    createClient(@Body() newClient: CreateClientsDto){
       return this.clientService.createClients (newClient)
    }

    @Delete(':id')
    deleteClient(@Param('id', ParseIntPipe) id: number){
        return this.clientService.deleteClients(id)
    }

    @Patch(':id')
    updateClient(@Param('id', ParseIntPipe) id:number, @Body() user: UpdateClientsDto){
        return this.clientService.updateClients(id, user)
    } 
}
