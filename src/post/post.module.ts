import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
    ]),
  ]
})
export class PostModule {}