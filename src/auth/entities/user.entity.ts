
import { Question } from 'src/quiz/question.entity'
import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  Unique, 
  CreateDateColumn, 
  DeleteDateColumn, 
  UpdateDateColumn, 
  OneToMany
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  first_name: string

  @Column()
  last_name: string

  @Column()
  @Unique(['string'])
  username: string

  @Column()
  email: string

  @Column()
  salt: string

  @Column()
  password: string

  @CreateDateColumn()
  public created_at: Date

  @UpdateDateColumn()
  public updated_at: Date | null

  @DeleteDateColumn()
  public deleted_at: Date | null

  // @OneToMany(type => Product, product => product.user, { eager: true })
  // products: Product[]
  @OneToMany(() => Question, (question) => question.user)
  questions: Question[]
}

{}