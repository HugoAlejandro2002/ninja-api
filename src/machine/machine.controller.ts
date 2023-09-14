import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { UpdateMachineDto } from './dto/update-machine.dto'; 
import { MachineService} from './machine.service';
import { Machine } from './machine.entity';
import { CreateMachineDto } from './dto/create-machine.dto';

@Controller('machine')
export class MachineController {

        
        constructor(private machineService: MachineService){}
    
        @Get()
        getMachines(): Promise<Machine[]>{
            return this.machineService.getMachines();
        }
    
        @Get(':id')
        getMachine(@Param('id', ParseIntPipe) id: number){
            return this.machineService.getMachine(id);
        }
    
        @Post()
        createMachines(@Body() newUser: CreateMachineDto){
           return this.machineService.createMachine(newUser)
        }
    
        @Delete(':id')
        deleteMachines(@Param('id', ParseIntPipe) id: number){
            return this.machineService.deleteMachine(id)
        }
    
        @Patch(':id')
        updateMachines(@Param('id', ParseIntPipe) id:number, @Body() user: UpdateMachineDto){
            return this.machineService.updateMachine(id, user)
        } 
}
