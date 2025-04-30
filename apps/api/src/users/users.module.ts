import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UploadModule } from '@lib/upload';
import { APP_GUARD } from '@nestjs/core';
import { UserViewGuard } from './guards/user-view.guard';
import { UserEditGuard } from './guards/user-edit.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UploadModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: UserViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserEditGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
