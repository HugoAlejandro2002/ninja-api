import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'clientes' })
export class Clients{

    @PrimaryGeneratedColumn()
    id: number 
    
    @Column({})
    clientFirstName: string
    
    @Column()
    clientLastName: string
        
    @Column({})
    borndate: number 
    
    @Column({})
    direction: string

    @Column({})
    cellphone: number 

    @Column({unique: true})
    email: string
    
    @Column({})
    planType: string

    @Column({})
    payplan: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;

}