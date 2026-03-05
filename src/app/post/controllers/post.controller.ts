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
    return await this.postService.get(id);
  }

  @Post()
  async create(
    @Body() dto: CreatePostDto,
  ) {
    return await this.postService.create(dto);
  }

  @Get('list/:userId')
  async list(
    @Param() { userId }: ListPostDto,
  ) {
    return await this.postService.list(userId);
  }
}