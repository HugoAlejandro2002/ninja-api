import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


<<<<<<< HEAD
@Entity({name: 'empleados3' })
=======
@Entity({name: 'empleados2' })
>>>>>>> 39d834257767242f104ef9736d35a6566c69904e
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

/*     @Column({unique: true})
    CI: number  */

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;
}