import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorFilter } from './error/error.filter';
import { ErrorInterceptor } from './error/error.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { GitHubModule } from './github/github.module';
import { ReposModule } from './repos/repos.module';
import { ConfigModule } from './config/config.module';
import { LoggingMiddleware } from './logging.middleware';

@Module({
  imports: [RedisModule, GitHubModule, ReposModule, ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
