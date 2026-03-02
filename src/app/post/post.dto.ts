import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetPostDto {
  @ApiProperty({ example: 1, description: 'Post id'})
  @Type(() => Number)
  @IsNumber()
  id: number;
}

export class CreatePostDto {
  @ApiProperty({ example: 5, description: 'Author id' })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 'test', description: 'Post title'})
  @IsString()
  title: string;

  @ApiProperty({ example: 'Lorem impsum', description: 'Post content' })
  @IsString()
  content: string;
}

export class ListPostDto {
  @ApiProperty({ example: 5, description: 'Author id' })
  @IsNumber()
  userId: number;
}