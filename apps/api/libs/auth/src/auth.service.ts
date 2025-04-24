import { HashService } from '@app/hash';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(
    email: string,
    password: string,
  ): Promise<boolean> {
    const account = await this.accountsService.getAccountByEmail(email);

    const isMatch = await this.hashService.comperePassword(
      password,
      account.password,
    );

    return isMatch;
  }

  async logIn(email: string, password: string): Promise<string> {
    const isValid = await this.validateUser(email, password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ email });
    return token;
  }
}
