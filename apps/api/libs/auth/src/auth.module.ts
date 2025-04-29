import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccountsModule } from 'src/accounts/accounts.module';
import { HashModule } from '@app/hash';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { JobsModule } from 'src/jobs/jobs.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { JobEditGuard } from './guards/job-edit.guard';
import { RolesGuard } from './guards/require-role.guard';
import { ApplicationEditGuard } from './guards/application-edit.guard';
import { UsersModule } from 'src/users/users.module';
import { ApplicationsModule } from 'src/applications/applications.module';
import { ApplicationViewGuard } from './guards/application-view.guard';
import { JobViewGuard } from './guards/job-view.guard';

@Module({
  imports: [
    AccountsModule,
    HashModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    JobsModule,
    CompaniesModule,
    UsersModule,
    ApplicationsModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JobViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JobEditGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApplicationViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApplicationEditGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
