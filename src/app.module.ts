import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from './app/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './app/post/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USER'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_NAME'),
          entities: [
            PostEntity
          ],
          logging: false,
          synchronize: false,
      })
    }),
    PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
