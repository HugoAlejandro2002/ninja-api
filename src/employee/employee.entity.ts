import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'empleados' })
export class Employee{

    @PrimaryGeneratedColumn()
    id: number 
    
    @Column({unique: true})
    employeename: string
    
    @Column()
    cargo: string
        
    @Column({unique: true})
    numero: number  
    
    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date
  
}