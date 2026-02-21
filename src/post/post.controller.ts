import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @GrpcMethod('PostService', 'CreatePost')
  createPost(data: { title: string; content: string }) {
    return this.postService.create(data.title, data.content);
  }

  @GrpcMethod('PostService', 'FindOne')
  findOne(data: { id: number }) {
    return this.postService.findOne(data.id);
  }

  @GrpcStreamMethod('PostService', 'FindAll')
  findAll() {
    return this.postService.findAll();
  }
}
