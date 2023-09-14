import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'empleados4' })
export class Employee{

    @PrimaryGeneratedColumn()
    id: number 
    
    @Column({})
    employeename:string
    
    @Column({})
    cargo: string
        
    @Column({})
    numero: number  

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;
}