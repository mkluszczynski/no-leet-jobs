import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    try {
      const token = await this.authService.logIn(email, password);
      return { token };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
