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
  ],
  exports: [AuthService],
})
export class AuthModule {}
