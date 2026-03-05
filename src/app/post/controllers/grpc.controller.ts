import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { PostService } from '../post.service';
import { CreatePostDto, GetPostDto, ListPostDto } from '../post.dto';


@Controller()
export class GrpcController {
  private readonly logger = new Logger(GrpcController.name);

  constructor(
    private readonly postService: PostService
  ) {}

  @GrpcMethod('PostService', 'CreatePost')
  async create(data: CreatePostDto) {
    return await this.postService.create(data);
  }

  @GrpcMethod('PostService', 'GetPost')
  async getPost(data: GetPostDto) {
    return await this.postService.get(data.id);
  }

  @GrpcMethod('PostService', 'ListPost')
  async list(data: ListPostDto) {
    return await this.postService.list(data.userId);
  }
}
