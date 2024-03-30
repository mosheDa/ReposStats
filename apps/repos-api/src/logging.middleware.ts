import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const userAgent = req.get('user-agent') || '';

      this.logger.log(
        `Request ${method} ${originalUrl} from ${userAgent} - ${responseTime}ms`,
      );
    });

    next();
  }
}
