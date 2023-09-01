import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'


@Entity({name: 'Maquinas' })
export class Machine{

    @PrimaryGeneratedColumn()
    id: number 

    @Column({})
    machineName: string

    @Column({})
    machineBrand: string
    
    @Column({})
    machineWayOfUse: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdDate: Date;
        
    @Column({})
    maintenanceDate: string  

    @Column({})
    needMaintenance?: boolean


}