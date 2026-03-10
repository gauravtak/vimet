import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "rooms" })
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "integer", nullable: false })
  hostId: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @CreateDateColumn({ type: "timestamptz" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamptz" })
  updatedAt: Date;
}
