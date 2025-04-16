import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApplicationDto } from './dto/application.dto';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  createdAt: Date;

  @Column()
  resumePath: string;

  public static fromDto(dto: ApplicationDto): Application {
    const application = new Application();
    application.firstName = dto.firstName;
    application.lastName = dto.lastName;
    application.email = dto.email;
    application.phone = dto.phone;
    application.createdAt = new Date();
    application.resumePath = '';
    return application;
  }

  updateFromDto(dto: ApplicationDto): void {
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.phone = dto.phone;
  }
}
