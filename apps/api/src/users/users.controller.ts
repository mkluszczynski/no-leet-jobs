import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { IdParam } from 'src/utils/common/ByIdParam';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadService } from '@lib/upload';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { RequireRole } from '@app/auth/decorators/require-role.decorator';
import { AuthorizeUserEdit } from 'src/users/decorators/auth-user-edit.decorator';
import { Role } from 'src/accounts/enums/role.enum';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  @RequireRole()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  @RequireRole(Role.USER)
  @AuthorizeUserEdit()
  @ApiParam({ name: 'id', type: Number })
  getUserById(@Param() params: IdParam): Promise<User> {
    return this.usersService.getUserById(params.id);
  }

  @Put(':id')
  @RequireRole(Role.USER)
  @AuthorizeUserEdit()
  @ApiParam({ name: 'id', type: Number })
  updateUserById(
    @Param() params: IdParam,
    @Body() dto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUserById(params.id, dto);
  }

  @Put(':id/avatar')
  @RequireRole(Role.USER)
  @AuthorizeUserEdit()
  @ApiParam({ name: 'id', type: Number })
  updateUserAvatarById(
    @Param() params: IdParam,
    @Body('file') file: Express.Multer.File,
  ): Promise<User> {
    this.uploadService.uploadFile(file, ['avatars']);
    return this.usersService.updateUserAvatarById(params.id, file);
  }

  @Delete(':id')
  @RequireRole(Role.USER)
  @AuthorizeUserEdit()
  @ApiParam({ name: 'id', type: Number })
  async deleteUserById(@Param() params: IdParam): Promise<void> {
    const user = await this.usersService.getUserById(params.id);

    this.uploadService.deleteFile(user.avatarPath);

    return this.usersService.deleteUser(user);
  }
}
