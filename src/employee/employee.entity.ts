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

    @Column({ type: 'timestamptz' }) // Recommended
    date_time_with_timezone: Date;
  
}