import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  public static fromDto(dto: CreateUserDto): User {
    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return user;
  }

  public updateFromDto(dto: UpdateUserDto): void {
    this.firstName = dto.firstName || this.firstName;
    this.lastName = dto.lastName || this.lastName;
    this.email = dto.email || this.email;
    this.phoneNumber = dto.phoneNumber || this.phoneNumber;
    this.isPublic = dto.isPublic !== undefined ? dto.isPublic : this.isPublic;
    this.updatedAt = new Date();
  }
}
