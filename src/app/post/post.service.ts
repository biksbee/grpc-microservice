import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { faker } from '@faker-js/faker';
import chunk from 'lodash/chunk';
import { PostListResponse } from './post.response';
import { CreatePostType } from './post.type';


@Injectable()
export class PostService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async onApplicationBootstrap() {
    // Генерируем 100 пользователей при старте
    // await this.generatePosts(500000);
  }

  async generatePosts(m: number) {
    const batchSize = 10000;
    const maxUserId = 9903;

    const posts = Array.from({ length: m }, () => ({
        userId: Math.floor(Math.random() * maxUserId) + 1,
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph({ min: 1, max: 3 }),
      }),
    );

    const batches = chunk(posts, batchSize);
    for (const [index, batch] of batches.entries()) {
      await this.postRepository.insert(batch);
      console.log(`Inserted batch ${index + 1}/${batches.length}`);
    }
  }

  async create(data: CreatePostType): Promise<PostEntity> {
      const post = this.postRepository.create({
        ...data
      });
      return await this.postRepository.save(post);
  }

  async get(id: number): Promise<PostEntity> {
    return await this.postRepository.findOneByOrFail({ id });
  }

  async list(userId: number): Promise<PostListResponse> {
    return {
        posts: await this.postRepository.find({ where: { userId }, take: 2 })
    }
  }
}
