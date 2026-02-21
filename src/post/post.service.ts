import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  private posts = [{ id: 1, title: 'Hello', content: 'World' }];

  create(title: string, content: string) {
    const post = {
      id: this.posts.length + 1,
      title,
      content,
    };

    this.posts.push(post);
    return post;
  }

  findOne(id: number) {
    return this.posts.find(p => p.id === id);
  }

  findAll() {

    return { posts: this.posts };
  }
}
