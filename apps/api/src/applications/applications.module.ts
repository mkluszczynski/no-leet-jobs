import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './application.entity';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { UploadModule } from '@lib/upload';
import { UsersModule } from 'src/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { ApplicationEditGuard } from './guards/application-edit.guard';
import { ApplicationViewGuard } from './guards/application-view.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Application]), UploadModule, UsersModule],
  controllers: [ApplicationsController],
  providers: [
    ApplicationsService,
    {
      provide: APP_GUARD,
      useClass: ApplicationViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApplicationEditGuard,
    },
  ],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
