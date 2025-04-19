import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body() loginDto: LoginDto): Promise<{ access_token: string }> {
  //   const user = await this.authService.validateUser(
  //     loginDto.email,
  //     loginDto.password,
  //   );
  //   if (!user) throw new UnauthorizedException();

  //   const payload = { email: user.email, sub: user.id };
  //   return { access_token: this.jwtService.sign(payload) };
  // }

  // @Post('register')
  // async register(
  //   @Body() registerDto: RegisterDto,
  // ): Promise<{ access_token: string }> {
  //   const user = await this.authService.registerUser(registerDto);
  //   const payload = { email: user.email, sub: user.id };
  //   return { access_token: this.jwtService.sign(payload) };
  // }
}
