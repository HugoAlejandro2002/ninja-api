import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service'; // Cambio de UserService a ClientService
import { getRepositoryToken } from '@nestjs/typeorm';
import { Clients } from './clients.entity'; // Cambio de User a Client
import { CreateClientsDto } from './dto/create-clients.dto'; // Cambio de CreateUserDto a CreateClientDto
import { UpdateClientsDto } from './dto/update-clients.dto'; // Cambio de UpdateUserDto a UpdateClientDto

describe('ClientService', () => { // Cambio de UserService a ClientService
  let clientService: ClientsService; // Cambio de userService a clientService
  let clientRepositoryMock: Record<string, jest.Mock>;

  beforeEach(async () => {
    clientRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService, // Cambio de UserService a ClientService
        {
          provide: getRepositoryToken(Clients), // Cambio de User a Client
          useValue: clientRepositoryMock,
        },
      ],
    }).compile();

    clientService = module.get<ClientsService>(ClientsService); // Cambio de userService a clientService
  });

  describe('getClients', () => { // Cambio de getUsers a getClients
    it('should return an array of clients', async () => { // Cambio de should return an array of users a should return an array of clients
      const expectedClients = [{}]; // Cambio de expectedUsers a expectedClients
      clientRepositoryMock.find.mockResolvedValue(expectedClients);

      const client = await clientService.getClients(); // Cambio de getUsers a getClients

      expect(client).toBe(expectedClients); // Cambio de expect(user) a expect(client)
    });
  });

  describe('getClient', () => { // Cambio de getUser a getClient
    it('should return a client when a valid ID is provided', async () => { // Cambio de should return a user when a valid ID is provided a should return a client when a valid ID is provided
      const clientId = 1; // Cambio de userId a clientId
      const expectedClient = {}; // Cambio de expectedUser a expectedClient
      clientRepositoryMock.findOne.mockResolvedValue(expectedClient);

      const client = await clientService.getClient(clientId); // Cambio de getUser a getClient y userId a clientId

      expect(client).toEqual(expectedClient); // Cambio de expect(user) a expect(client)
    });

    it('should throw an error when an invalid ID is provided', async () => { // Cambio de should throw an error when an invalid ID is provided a should throw an error when an invalid ID is provided
      const invalidClientId = 999; // Cambio de invalidUserId a invalidClientId
      clientRepositoryMock.findOne.mockResolvedValue(null); 

      try {
        await clientService.getClient(invalidClientId); // Cambio de getUser a getClient y invalidUserId a invalidClientId
      } catch (error) {
        expect(error.message).toBe('Cliente no encontrado'); // Cambio de Usuario no encontrada a Cliente no encontrado
        expect(error.status).toBe(404); 
      }
    });
  });

  describe('createClient', () => { // Cambio de createUser a createClient
    it('should create and return a client when valid data is provided', async () => { // Cambio de should create and return a user when valid data is provided a should create and return a client when valid data is provided
      const createClientDto: CreateClientsDto = { // Cambio de CreateUserDto a CreateClientDto
        clientFirstName: 'Pedro',
        clientLastName: 'Pascal',
        borndate: '12/12/12',
        direction: 'irpavi2',
        cellphone: 75674533,
        email: 'perdopas@gmail.com',
        planType: 'cool',
        payplan: 'mensual',
      };
      const expectedClient = { };

      clientRepositoryMock.create.mockReturnValue(expectedClient);
      clientRepositoryMock.save.mockResolvedValue(expectedClient);

      const client = await clientService.createClients(createClientDto); // Cambio de createUser a createClient y createClientDto a createClientDto

      expect(client).toEqual(expectedClient); // Cambio de expect(user) a expect(client)
    });

    it('should throw an error when invalid data is provided', async () => { // Cambio de should throw an error when invalid data is provided a should throw an error when invalid data is provided
      const createClientsDto: CreateClientsDto = {

        clientFirstName: 'Pedro',
        clientLastName: 'Pascal',
        borndate: '12/12/12',
        direction: 'irpavi2',
        cellphone: 75674533,
        email: 'perdopas@gmail.com',
        planType: 'cool',
        payplan: 'mensual',
      };

      try {
        await clientService.createClients(createClientsDto); // Cambio de createUser a createClient y createClientDto a createClientDto
      } catch (error) {
        expect(error.message).toBe('Cliente no encontrado'); // Cambio de Usuario no encontrado a Cliente no encontrado
        expect(error.status).toBe(409);
      }
    });

    describe('updateClient', () => { // Cambio de updateUser a updateClient
        it('should update and return a client when valid data is provided', async () => { // Cambio de should update and return a user when valid data is provided a should update and return a client when valid data is provided
          const clientId = 1;
    
          const updateClientDto: UpdateClientsDto = { // Cambio de UpdateUserDto a UpdateClientDto
            clientFirstName: 'Pedro',
            clientLastName: 'Pascal',
            borndate: '12/12/12',
            direction: 'irpavi2',
            cellphone: 75674533,
            email: 'perdopas@gmail.com',
            planType: 'cool',
            payplan: 'mensual',
    
          };
          const existingClient = {         
            clientFirstName: 'Pedro',
            clientLastName: 'Pascal',
            borndate: '12/12/12',
            direction: 'irpavi2',
            cellphone: 75674533,
            email: 'perdopas@gmail.com',
            planType: 'cool',
            payplan: 'mensual',
          };
    
          const updatedClient = { ...existingClient, ...updateClientDto };
    
          clientRepositoryMock.findOne.mockResolvedValue(existingClient);
          clientRepositoryMock.save.mockResolvedValue(updatedClient);
    
          const client = await clientService.updateClients(clientId, updateClientDto); // Cambio de updateUser a updateClient y userId a clientId
    
          expect(client).toEqual(updatedClient); // Cambio de expect(machine) a expect(client)
        });
      });
    
      describe('deleteClient', () => { // Cambio de deleteUser a deleteClient
        it('should delete a client when a valid ID is provided', async () => { // Cambio de should delete a user when a valid ID is provided a should delete a client when a valid ID is provided
          const clientId = 1;
          const existingClient = {         
            username: 'Trotadora',
            password: 'UFC',
          };
            
          clientRepositoryMock.findOne.mockResolvedValue(existingClient);
          const result = await clientService.deleteClients(clientId); // Cambio de deleteUser a deleteClient y userId a clientId
          expect(result).toBeUndefined();
        });
      });
    });
});