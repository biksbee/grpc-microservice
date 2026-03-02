import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { PostService } from '../post.service';
import { CreatePostDto, GetPostDto, ListPostDto } from '../post.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(
    private readonly postService: PostService
  ) {}

  @Get(':id')
  async get(
    @Param() { id }: GetPostDto,
  ) {
    const start = Date.now();
    const post = await this.postService.get(id);
    const duration = Date.now() - start;
    console.log(`REST /posts/${id} processed in ${duration}ms`);
    return post;
  }

  @Post()
  async create(
    @Body() dto: CreatePostDto,
  ) {
    const start = Date.now();
    const post = await this.postService.create(dto);
    const duration = Date.now() - start;
    this.logger.log(`Rest /posts processed in ${duration}ms`);
    return post;
  }

  @Get('list/:userId')
  async list(
    @Param() { userId }: ListPostDto,
  ) {
    const start = Date.now();
    const post = await this.postService.list(userId);
    const duration = Date.now() - start;
    console.log(`REST /posts/list/${userId} processed in ${duration}ms`);
    return post;
  }
}