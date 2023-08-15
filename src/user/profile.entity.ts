import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('perfil_de_usuarios')
export class Profile{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstname: string

    @Column()
    lastname: string

    @Column({nullable: true})
    age: number
}