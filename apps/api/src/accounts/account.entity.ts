import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { Role } from './enums/role.enum';
import { UpdateAccountDto } from './dto/update-account.dto';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: true,
  })
  role: Role | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  public static fromDto(dto: CreateAccountDto): Partial<Account> {
    const account = new Account();
    account.email = dto.email;
    account.password = dto.password;
    return account;
  }

  public updateFromDto(dto: UpdateAccountDto): Account {
    this.email = dto.email || this.email;
    this.password = dto.password || this.password;
    return this;
  }
}
