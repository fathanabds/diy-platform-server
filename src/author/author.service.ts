import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author: Author = new Author();
    author.fullName = createAuthorDto.fullName;
    author.gender = createAuthorDto.gender;
    return this.authorRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
    return author;
  }

  async findByName(fullName: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { fullName },
    });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author: Author = await this.authorRepository.findOneBy({ id });
    if (!author) {
      throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
    }
    author.fullName = updateAuthorDto.fullName;
    author.gender = updateAuthorDto.gender;
    return this.authorRepository.save(author);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.authorRepository.delete(id);
  }
}
