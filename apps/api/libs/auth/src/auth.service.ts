import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  // validateUser(email: string, password: string): Promise<any> {}

  // async login(loginDto: LoginDto): Promise<any> {
  //   const { email, password } = loginDto;
  //   const user = await this.validateUser(email, password);

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   // Implement JWT token generation logic here
  //   return { access_token: 'your_jwt_token' };
  // }
}
