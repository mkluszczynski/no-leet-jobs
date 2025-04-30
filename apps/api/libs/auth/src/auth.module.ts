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
import { RolesGuard } from './guards/require-role.guard';
import { UsersModule } from 'src/users/users.module';
import { ApplicationsModule } from 'src/applications/applications.module';
import { CompanyEditGuard } from 'src/companies/guards/company-edit.guard';
import { UserViewGuard } from 'src/users/guards/user-view.guard';
import { UserEditGuard } from 'src/users/guards/user-edit.guard';
import { ApplicationViewGuard } from 'src/applications/guards/application-view.guard';
import { ApplicationEditGuard } from 'src/applications/guards/application-edit.guard';
import { JobViewGuard } from 'src/jobs/guards/job-view.guard';
import { JobEditGuard } from 'src/jobs/guards/job-edit.guard';

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
      useClass: CompanyEditGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserEditGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApplicationViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ApplicationEditGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JobViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JobEditGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
