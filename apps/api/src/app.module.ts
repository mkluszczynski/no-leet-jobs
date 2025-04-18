import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { toBoolean } from '../utils/boolean';
import { JobsModule } from './jobs/jobs.module';
import { SkillsModule } from './skills/skills.module';
import { RequiredSkillsModule } from './required-skills/required-skills.module';
import { ApplicationsModule } from './applications/applications.module';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from '@lib/upload';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    UploadModule,
  ],
})
export class AppModule {}
