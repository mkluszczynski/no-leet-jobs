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
import { JobEditAuthorizationGuard } from './guards/job-edit-authorization.guard';

@Module({
  imports: [
    AccountsModule,
    HashModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    AccountsModule,
    JobsModule,
    CompaniesModule,
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
      useClass: JobEditAuthorizationGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
