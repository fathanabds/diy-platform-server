import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: () => void) {
    console.log(`received request for url: ${req.url}`);
    console.log(`req params: ${req.params.id || 'no params'}`);
    next();
  }
}
