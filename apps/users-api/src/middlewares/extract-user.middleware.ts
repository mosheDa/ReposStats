import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user: { email: string } | null;
}

@Injectable()
export class ExtractUserMiddleware implements NestMiddleware {
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
        req.user = { email: decoded.email }; // Assuming email is stored in 'email' field of the JWT payload
      } catch (error) {
        req.user = null;
      }
    } else {
      req.user = null;
    }
    next();
  }
}
