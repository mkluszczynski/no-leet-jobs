import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { UsersModule } from 'src/users/users.module';
import { CompaniesModule } from 'src/companies/companies.module';
import { HashModule } from '@app/hash';
import { APP_GUARD } from '@nestjs/core';
import { AccountViewGuard } from './guards/account-view.guard';
import { AccountEditGuard } from './guards/account-edit.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    UsersModule,
    CompaniesModule,
    HashModule,
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    {
      provide: APP_GUARD,
      useClass: AccountViewGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AccountEditGuard,
    },
  ],
  exports: [AccountsService],
})
export class AccountsModule {}
