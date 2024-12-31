import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Author } from 'src/author/entities/author.entity';

export class CreatePostDto {
  @IsString()
  @MinLength(2, { message: 'Title must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Title is required' })
  @IsDefined({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsEnum(['easy', 'medium', 'hard'], {
    message: 'Difficulty must be easy, medium, or hard',
  })
  @IsDefined({ message: 'Difficulty is required' })
  difficulty: string;

  description: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Estimated time is required' })
  @IsDefined({ message: 'Estimated time is required' })
  @Min(0, { message: 'Estimated time must be at least 0' })
  estimatedTime: number;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: 'Author is required' })
  author: Author;

  @IsString()
  @MinLength(2, { message: 'Image Url must have at least 2 characters.' })
  @IsNotEmpty({ message: 'Image Url is required' })
  @IsDefined({ message: 'Image Url is required' })
  imageUrl: string;
}
