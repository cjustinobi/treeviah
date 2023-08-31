import { User } from 'src/auth/entities/user.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  price: number;

  @ManyToOne(type => User, user => user.products, { eager: false })
  user: User  
}

{}