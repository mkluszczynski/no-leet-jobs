import { AuthModule } from '@app/auth';
import { UploadModule } from '@lib/upload';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { toBoolean } from '../utils/boolean';
import { ApplicationsModule } from './applications/applications.module';
import { CompaniesModule } from './companies/companies.module';
import { JobsModule } from './jobs/jobs.module';
import { RequiredSkillsModule } from './required-skills/required-skills.module';
import { SkillsModule } from './skills/skills.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: toBoolean(configService.get('DB_SYNC')),
        logging: toBoolean(configService.get('DB_LOGGING')),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        extensions: ['.pdf', '.jpg', '.jpeg', '.png'],
      },
    }),
    JobsModule,
    SkillsModule,
    RequiredSkillsModule,
    ApplicationsModule,
    CompaniesModule,
    UsersModule,
    AuthModule,
    UploadModule,
    AccountsModule,
  ],
})
export class AppModule {}
