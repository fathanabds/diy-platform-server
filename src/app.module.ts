import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from './author/author.module';
import { Author } from './author/entities/author.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { LogMiddleware } from './middlewares/log/log.middleware';
import { AuthorController } from './author/author.controller';
import { PostController } from './post/post.controller';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'postgres',
      username: 'postgres',
      entities: [Author, Post],
      database: 'diy_platform',
      synchronize: true,
      logging: true,
    }),
    AuthorModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LogMiddleware).forRoutes({
    //   path: '/*', // start with /
    //   method: RequestMethod.ALL,
    // }); // cara 1
    consumer.apply(LogMiddleware).forRoutes(AuthorController, PostController); // cara 2. implement middleware utk semua yang ada di AuthorController dan PostController
    consumer.apply(AuthMiddleware).forRoutes(PostController);
  }
}
