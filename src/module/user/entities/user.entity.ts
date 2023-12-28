
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique:true})
    email:string;

    @Column()
    password:string;

    @CreateDateColumn()
    createdAt:Timestamp;

    @CreateDateColumn()
    updatedAt:Timestamp;
}