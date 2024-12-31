import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post: Post = new Post();
    post.title = createPostDto.title;
    post.difficulty = createPostDto.difficulty;
    post.estimatedTime = createPostDto.estimatedTime;
    post.imageUrl = createPostDto.imageUrl;
    post.author = createPostDto.author;
    return this.postRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post: Post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    post.difficulty = updatePostDto.difficulty;
    post.estimatedTime = updatePostDto.estimatedTime;
    post.imageUrl = updatePostDto.title;
    return this.postRepository.save(post);
  }

  async vote(id: number) {
    const post: Post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    post.totalVote++;
    return this.postRepository.save(post);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.postRepository.delete(id);
  }
}
