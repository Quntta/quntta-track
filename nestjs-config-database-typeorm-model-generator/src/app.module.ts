import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigEnum } from './enum/config.enum';
import { User } from './models/User';
import { Profile } from './models/Profile';
import { Logs } from './models/Logs';
import { Roles } from './models/Roles';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>(ConfigEnum.DB_TYPE),
          host: configService.get<string>(ConfigEnum.DB_HOST),
          port: configService.get<number>(ConfigEnum.DB_PORT),
          username: configService.get<string>(ConfigEnum.DB_USER),
          password: configService.get<string>(ConfigEnum.DB_ROOT_PASSWORD),
          database: configService.get<string>(ConfigEnum.DB_DATABASE),
          entities: [User, Profile, Logs, Roles],
          synchronize: configService.get<boolean>(ConfigEnum.DB_SYNCHRONIZE),
          logging: ['error'],
        }) as TypeOrmModuleOptions,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
