// repos/repos.module.ts
import { Module } from '@nestjs/common';
import { ReposService } from './repos.service';
import { RedisModule } from '../redis/redis.module';
import { GitHubModule } from '../github/github.module';

@Module({
  imports: [RedisModule, GitHubModule],
  providers: [ReposService],
  exports: [ReposService],
})
export class ReposModule {}
