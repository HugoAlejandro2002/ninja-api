import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'empleados3' })
export class Employee{

    @PrimaryGeneratedColumn()
    id: number 
    
    @Column({})
    employeeFirstName: string

    @Column({})
    employeeLastName: string
    
    @Column({})
    cargo: string
        
    @Column({})
    numero: number  

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;
}