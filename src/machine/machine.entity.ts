import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'Maquinas 1' })
export class Machine{

    @PrimaryGeneratedColumn()
    id: number 

    @Column({})
    machineName: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;
        
    @Column({})
    needMaintenance?: boolean
}