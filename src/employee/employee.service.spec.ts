import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service'; // Cambio de UserService a EmployeeService
import { getRepositoryToken } from '@nestjs/typeorm';
import { Employee } from './employee.entity'; // Cambio de User a Employee
import { CreateEmployeeDto } from './dto/create-employee.dto'; // Cambio de CreateUserDto a CreateEmployeeDto
import { UpdateEmployeeDto } from './dto/update-employee.dto'; // Cambio de UpdateUserDto a UpdateEmployeeDto

describe('EmployeeService', () => { // Cambio de UserService a EmployeeService
  let employeeService: EmployeeService; // Cambio de userService a employeeService
  let employeeRepositoryMock: Record<string, jest.Mock>;

  beforeEach(async () => {
    employeeRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService, // Cambio de UserService a EmployeeService
        {
          provide: getRepositoryToken(Employee), // Cambio de User a Employee
          useValue: employeeRepositoryMock,
        },
      ],
    }).compile();

    employeeService = module.get<EmployeeService>(EmployeeService); // Cambio de userService a employeeService
  });

  describe('getEmployees', () => { // Cambio de getUsers a getEmployees
    it('should return an array of employees', async () => { // Cambio de should return an array of users a should return an array of employees
      const expectedEmployees = [{}]; // Cambio de expectedUsers a expectedEmployees
      employeeRepositoryMock.find.mockResolvedValue(expectedEmployees);

      const employee = await employeeService.getEmployees(); // Cambio de getUsers a getEmployees

      expect(employee).toBe(expectedEmployees); // Cambio de expect(user) a expect(employee)
    });
  });

  describe('getEmployee', () => { // Cambio de getUser a getEmployee
    it('should return an employee when a valid ID is provided', async () => { // Cambio de should return a user when a valid ID is provided a should return an employee when a valid ID is provided
      const employeeId = 1; // Cambio de userId a employeeId
      const expectedEmployee = {}; // Cambio de expectedUser a expectedEmployee
      employeeRepositoryMock.findOne.mockResolvedValue(expectedEmployee);

      const employee = await employeeService.getEmployee(employeeId); // Cambio de getUser a getEmployee y userId a employeeId

      expect(employee).toEqual(expectedEmployee); // Cambio de expect(user) a expect(employee)
    });

    it('should throw an error when an invalid ID is provided', async () => { // Cambio de should throw an error when an invalid ID is provided a should throw an error when an invalid ID is provided
      const invalidEmployeeId = 999; // Cambio de invalidUserId a invalidEmployeeId
      employeeRepositoryMock.findOne.mockResolvedValue(null); 

      try {
        await employeeService.getEmployee(invalidEmployeeId); // Cambio de getUser a getEmployee y invalidUserId a invalidEmployeeId
      } catch (error) {
        expect(error.message).toBe('Empleado no encontrado'); // Cambio de Usuario no encontrada a Empleado no encontrado
        expect(error.status).toBe(404); 
      }
    });
  });

  describe('createEmployee', () => { // Cambio de createUser a createEmployee
    it('should create and return an employee when valid data is provided', async () => { // Cambio de should create and return a user when valid data is provided a should create and return an employee when valid data is provided
      const createEmployeeDto: CreateEmployeeDto = { // Cambio de CreateUserDto a CreateEmployeeDto
        employeename: 'Luciano Vargas',
        cargo: 'Entrenador',
        numero: 123455
      };
      const expectedEmployee = { };

      employeeRepositoryMock.create.mockReturnValue(expectedEmployee);
      employeeRepositoryMock.save.mockResolvedValue(expectedEmployee);

      const employee = await employeeService.createEmployee(createEmployeeDto); // Cambio de createUser a createEmployee y createEmployeeDto a createEmployeeDto

      expect(employee).toEqual(expectedEmployee); // Cambio de expect(user) a expect(employee)
    });

    it('should throw an error when invalid data is provided', async () => { // Cambio de should throw an error when invalid data is provided a should throw an error when invalid data is provided
      const createEmployeeDto: CreateEmployeeDto = {

        employeename: 'Luciano Vargas',
        cargo: 'Entrenador',
        numero: 123455
      };

      try {
        await employeeService.createEmployee(createEmployeeDto); // Cambio de createUser a createEmployee y createEmployeeDto a createEmployeeDto
      } catch (error) {
        expect(error.message).toBe('Empleado no encontrado'); // Cambio de Usuario no encontrado a Empleado no encontrado
        expect(error.status).toBe(409);
      }
    });
  });

  describe('updateEmployee', () => { // Cambio de updateUser a updateEmployee
    it('should update and return an employee when valid data is provided', async () => { // Cambio de should update and return a user when valid data is provided a should update and return an employee when valid data is provided
      const employeeId = 1;

      const updateEmployeeDto: UpdateEmployeeDto = { // Cambio de UpdateUserDto a UpdateEmployeeDto
        employeename: 'Luciano Vargas',
        cargo: 'Entrenador',
        numero: 123455

      };
      const existingEmployee = {         
        username: 'Trotadora',
        password: 'UFC1',};

      const updatedEmployee = { ...existingEmployee, ...updateEmployeeDto };

      employeeRepositoryMock.findOne.mockResolvedValue(existingEmployee);
      employeeRepositoryMock.save.mockResolvedValue(updatedEmployee);

      const employee = await employeeService.updateEmployee(employeeId, updateEmployeeDto); // Cambio de updateUser a updateEmployee y employeeId a employeeId

      expect(employee).toEqual(updatedEmployee); // Cambio de expect(machine) a expect(employee)
    });
  });

  describe('deleteEmployee', () => { // Cambio de deleteUser a deleteEmployee
    it('should delete an employee when a valid ID is provided', async () => { // Cambio de should delete a user when a valid ID is provided a should delete an employee when a valid ID is provided
      const employeeId = 1;
      const existingEmployee = {         
        username: 'Trotadora',
        password: 'UFC',};
        
      employeeRepositoryMock.findOne.mockResolvedValue(existingEmployee);
      const result = await employeeService.deleteEmployee(employeeId); // Cambio de deleteUser a deleteEmployee y employeeId a employeeId
      expect(result).toBeUndefined();
    });
  });
});