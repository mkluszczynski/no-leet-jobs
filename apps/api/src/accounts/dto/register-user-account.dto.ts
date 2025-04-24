import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class RegisterUserAccountDto extends CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
