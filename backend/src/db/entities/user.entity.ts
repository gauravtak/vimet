import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", nullable: false, unique: true })
    username: string

    @Column({ type: "varchar", nullable: false, unique: true })
    email: string

    @Column({ type: "varchar", nullable: false })
    password: string

    @Column({ type: "boolean", nullable: false, default: true })
    isActive: boolean

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date
}