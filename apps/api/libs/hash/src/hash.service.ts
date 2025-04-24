import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    const hash = await bcrypt.hash(password, saltOrRounds);

    return hash;
  }

  async comperePassword(password, hash): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }
}
