import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RangeModule } from './range/range.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigEnum } from '@/enum/config.enum';
import { User } from '@/user/user.entity';
import { Profile } from '@/user/profile.entity';
import { Logs } from './logs/logs.entity';
import { Roles } from './roles/roles.entity';

const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    UserModule,
    RangeModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: 3306,
    //   username: process.env.DB_USER,
    //   password: process.env.DB_ROOT_PASSWORD,
    //   database: process.env.DB_DATABASE,
    //   entities: [],
    //   synchronize: true,
    //   logging: ['error'],
    // }),
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
          synchronize: true,
          logging: ['error'],
        }) as TypeOrmModuleOptions,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
