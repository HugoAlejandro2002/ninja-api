import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Perfil_del_usuario')
export class profile{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string
  
    @Column()
    lastname: string

    @Column({nullable: true})
    age: number

}