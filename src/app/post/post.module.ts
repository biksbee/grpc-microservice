import { GrpcController } from './controllers/grpc.controller';
import { PostService } from './post.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { PostController } from './controllers/post.controller';

@Module({
  controllers: [
    PostController,
    GrpcController,
  ],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([
      PostEntity,
    ]),
  ],
  exports: [PostService],
})
export class PostModule {}