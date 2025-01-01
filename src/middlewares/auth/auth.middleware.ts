import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authorService: AuthorService) {}

  async use(req: any, res: any, next: () => void) {
    const authorName = req.headers['x-name'] as string;
    if (!authorName) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const author = this.authorService.findByName(authorName);
    console.log('🚀 ~ AuthMiddleware ~ use ~ author:', author);
    if (author) {
      req.author = author;
      next();
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
