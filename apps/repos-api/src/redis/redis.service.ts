import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { IRepo } from '../interfaces/repo.interface';

@Injectable()
export class RedisService {
  private redisClient: Redis;
  private ttl: number;
  private key: string;
  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly configService: ConfigService) {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    this.redisClient = new Redis(redisUrl);
    this.ttl = parseInt(this.configService.get<string>('REDIS_TTL'));
    this.key = this.configService.get<string>('REDIS_KEY');
  }

  async addRepo(url: string, stars: number) {
    this.logger.log('Acquiring transaction lock...');

    // Use watch to set up locking
    await this.redisClient.watch(this.key);

    const pipeline = this.redisClient.pipeline();

    await pipeline.zadd(this.key, 'NX', stars, url);

    // Set the expiration time for the key
    await pipeline.expire(this.key, this.ttl);

    await pipeline.exec();

    this.logger.log('Transaction executed successfully.');
    this.logger.log('Releasing transaction lock...');
  }

  async getTopStarredRepos(start: number, end: number): Promise<IRepo[]> {
    const repos = await this.redisClient.zrevrange(
      this.key,
      start,
      end,
      'WITHSCORES',
    );
    const result: IRepo[] = [];
    for (let i = 0; i < repos.length; i += 2) {
      result.push({
        url: repos[i],
        stars: parseInt(repos[i + 1], 10),
      });
    }
    return result;
  }

  async getRepoCount(): Promise<number> {
    return await this.redisClient.zcard(this.key);
  }
}
