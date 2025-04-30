import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Application } from 'src/applications/application.entity';
import { Account } from 'src/accounts/account.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @OneToOne(() => Account, { onDelete: 'CASCADE' })
  account: Account;

  @Column({ nullable: true })
  avatarPath: string | null;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phoneNumber: string | null;

  @Column({ default: false })
  isPublic: boolean;

  @OneToMany(() => Application, (application) => application.user, {
    nullable: true,
  })
  applications: Application[];

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

  public static fromDto(dto: CreateUserDto): User {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    return user;
  }

  public updateFromDto(dto: UpdateUserDto): void {
    this.firstName = dto.firstName || this.firstName;
    this.lastName = dto.lastName || this.lastName;
    this.email = dto.email || this.email;
    this.phoneNumber = dto.phoneNumber || this.phoneNumber;
    this.isPublic = dto.isPublic !== undefined ? dto.isPublic : this.isPublic;
  }
}
