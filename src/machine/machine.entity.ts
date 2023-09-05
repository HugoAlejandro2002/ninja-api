import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

//nombre (Ejemplo: TROTADORA, MAQUINA SMITH, MÁQUINA DE POLEAS MULTIFUNCIONAL, BICI ELÍPTICA, PRENSA DE PIERNA, 
//MÁQUINA DE PRESS BANCA, etc), marca (Ejemplo: AFW - AllFreeWeight ; Adidas ; Assault Fitness ; UFC ; BH Hi Power, etc), 

@Entity({name: 'Maquinas 1' })
export class Machine{

    @PrimaryGeneratedColumn()
    id: number 

    @Column({})
    machineName: string

    @Column({})
    machineBrand: string

    @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    acquisitionDate: Date;
    
    @Column({})
    maintenanceDate: string
        
    @Column({})
    needMaintenance: boolean
}