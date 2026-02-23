import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';
import { faker } from '@faker-js/faker';
import chunk from 'lodash/chunk';


@Injectable()
export class PostService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async onApplicationBootstrap() {
    // Генерируем 100 пользователей при старте
    await this.generatePosts(1000000);
  }

  async generatePosts(m: number) {
    const batchSize = 10000;
    const maxUserId = 9903;

    const posts: PostEntity[] = Array.from({ length: m }, () =>
      this.postRepository.create({
        userId: String(Math.floor(Math.random() * maxUserId) + 1),
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

  async create(userId: string, title: string, content: string): Promise<PostEntity> {
    const post = this.postRepository.create({
      userId,
      title,
      content,
    });
    return await this.postRepository.save(post);
  }

  async findOne(id: number): Promise<PostEntity> {
    return await this.postRepository.findOneByOrFail({ id });
  }

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository.find({ take: 30 });
  }
}
