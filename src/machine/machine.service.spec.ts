import { Test, TestingModule } from '@nestjs/testing';
import { MachineService } from './machine.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Machine } from './machine.entity';
import {CreateMachineDto} from './dto/create-machine.dto'
import {UpdateMachineDto} from './dto/update-machine.dto'

describe('MachineService', () => {
  let machineService: MachineService;
  let machineRepositoryMock: Record<string, jest.Mock>;

  beforeEach(async () => {
    machineRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MachineService,
        {
          provide: getRepositoryToken(Machine),
          useValue: machineRepositoryMock,
        },
      ],
    }).compile();

    machineService = module.get<MachineService>(MachineService);
  });

  describe('getMachines', () => {
    it('should return an array of machines', async () => {
      const expectedMachines = [{}];
      machineRepositoryMock.find.mockResolvedValue(expectedMachines);

      const machines = await machineService.getMachines();

      expect(machines).toBe(expectedMachines);
    });
  });

  describe('getMachine', () => {
    it('should return a machine when a valid ID is provided', async () => {
      const machineId = 1;
      const expectedMachine = {};
      machineRepositoryMock.findOne.mockResolvedValue(expectedMachine);

      const machine = await machineService.getMachine(machineId);

      expect(machine).toEqual(expectedMachine);
    });

    it('should throw an error when an invalid ID is provided', async () => {
      const invalidMachineId = 999;
      machineRepositoryMock.findOne.mockResolvedValue(null); 

      try {
        await machineService.getMachine(invalidMachineId);
      } catch (error) {
        expect(error.message).toBe('Máquina no encontrada');
        expect(error.status).toBe(404); 
      }
    });
  });

  describe('createMachine', () => {
    it('should create and return a machine when valid data is provided', async () => {
      const createMachineDto: CreateMachineDto = {
        machineName: 'Trotadora',
        machineBrand: 'AFW - All Free Weight',
        maintenanceDate: '2023-06-01',
        acquisitionDate: '2023-01-01',
        needMaintenance: true,
      };
      const expectedMachine = { };

      machineRepositoryMock.create.mockReturnValue(expectedMachine);
      machineRepositoryMock.save.mockResolvedValue(expectedMachine);

      const machine = await machineService.createMachine(createMachineDto);

      expect(machine).toEqual(expectedMachine);
    });

    it('should throw an error when invalid data is provided', async () => {
      const createMachineDto: CreateMachineDto = {

        machineName: 'Máquina Incorrecta',
        machineBrand: 'Marca Incorrecta',
        maintenanceDate: '2023-06-01',
        acquisitionDate: '2023-01-01',
        needMaintenance: true,
      };

      try {
        await machineService.createMachine(createMachineDto);
      } catch (error) {
        expect(error.message).toBe('Nombre o marca de máquina incorrecto'); 
        expect(error.status).toBe(409);
      }
    });
  });

  describe('updateMachine', () => {
    it('should update and return a machine when valid data is provided', async () => {
      const machineId = 1;

      const updateMachineDto: UpdateMachineDto = {
        machineName: 'Trotadora',
        machineBrand: 'UFC',
        maintenanceDate: '2023-06-01',
        acquisitionDate: '2023-01-01',
        needMaintenance: true,
      };
      const existingMachine = {         
        id: 1,
        machineName: 'Trotadora',
        machineBrand: 'UFC',
        maintenanceDate: '2023-06-01',
        acquisitionDate: '2023-01-01',
        needMaintenance: true,};

      const updatedMachine = { ...existingMachine, ...updateMachineDto };

      machineRepositoryMock.findOne.mockResolvedValue(existingMachine);
      machineRepositoryMock.save.mockResolvedValue(updatedMachine);

      const machine = await machineService.updateMachine(machineId, updateMachineDto);

      expect(machine).toEqual(updatedMachine);
    });
  });

  describe('deleteMachine', () => {
    it('should delete a machine when a valid ID is provided', async () => {
      const machineId = 1;
      const existingMachine = {         
        machineName: 'Trotadora',
        machineBrand: 'UFC',
        maintenanceDate: '2023-06-01',
        acquisitionDate: '2023-01-01',
        needMaintenance: true};
        
      machineRepositoryMock.findOne.mockResolvedValue(existingMachine);
      const result = await machineService.deleteMachine(machineId);
      expect(result).toBeUndefined();
    });
  });
});