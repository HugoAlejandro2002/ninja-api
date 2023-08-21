import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'clientes' })
export class Clients{

    @PrimaryGeneratedColumn()
    id: number 
    
    @Column({unique: true})
    clientFirstName: string
    
    @Column()
    clientLastName: string
        
    @Column({})
    borndate: number 
    
    @Column({})
    direction: string

    @Column({unique: true})
    cellphone: number 

    @Column({unique: true})
    email: string
    
    @Column({})
    planType: string

    @Column({})
    payplan: string

    @Column({})
    foto: string

}