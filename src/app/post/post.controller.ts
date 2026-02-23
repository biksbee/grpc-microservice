import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(
    private readonly postService: PostService
  ) {}

  @GrpcMethod('PostService', 'CreatePost')
  async createPost(data: { userId: string, title: string; content: string }) {
    return await this.postService.create(data.userId, data.title, data.content);
  }

  @GrpcMethod('PostService', 'FindOne')
  async findOne(data: { id: number }) {
    return await this.postService.findOne(data.id);
  }

  @GrpcStreamMethod('PostService', 'FindAll')
  async findAll() {
    return await this.postService.findAll();
  }
}
