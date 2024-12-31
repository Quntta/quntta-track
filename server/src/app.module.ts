import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RangeModule } from './range/range.module';
import { ConfigModule } from '@nestjs/config';

const envFilePath =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
    }),
    UserModule,
    RangeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
