import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { join } from 'path';
import { Account } from 'src/accounts/account.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUserById(id: number): Promise<User> {
    const user = this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  getUserByAccountId(accountId: number): Promise<User> {
    const user = this.userRepository.findOne({
      where: { account: { id: accountId } },
    });
    if (!user) {
      throw new NotFoundException(
        `User with account id ${accountId} not found`,
      );
    }
    return user;
  }

  getUserByAccountEmail(email: string): Promise<User> {
    const user = this.userRepository.findOne({
      where: { account: { email } },
    });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  tryGetUserByEmail(email: string): Promise<User | null> {
    if (!email) return null;
    return this.userRepository.findOne({
      where: { account: { email } },
    });
  }

  createUserFromDtoAndAccount(
    dto: CreateUserDto,
    account: Account,
  ): Promise<User> {
    const user = User.fromDto(dto);
    user.account = account;
    return this.userRepository.save(user);
  }

  async updateUserById(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    user.updateFromDto(dto);

    return this.userRepository.save(user);
  }

  async updateUserAvatarById(
    id: number,
    file: Express.Multer.File,
  ): Promise<User> {
    const user = await this.getUserById(id);

    user.avatarPath = join('uploads', 'avatars', file.originalname);

    return this.userRepository.save(user);
  }

  async deleteUser(user: User): Promise<void> {
    await this.userRepository.remove(user);
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.deleteUser(user);
  }
}
