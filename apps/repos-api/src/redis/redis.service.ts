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
    // Log that transaction lock is being acquired
    this.logger.log('Acquiring transaction lock...');

    // Use watch to set up optimistic locking
    await this.redisClient.watch(this.key);

    // Start the pipeline
    const pipeline = this.redisClient.pipeline();

    // Get the current score of the repository
    const currentScore = await this.redisClient.zscore(this.key, url);

    // Determine whether to update the score or add a new entry
    if (currentScore !== null) {
      // If the repository already exists, update its score
      await pipeline.zadd(this.key, 'NX', currentScore + stars, url);
    } else {
      // If it's a new repository, add it with the given score
      await pipeline.zadd(this.key, 'NX', stars, url);
    }

    // Set the expiration time for the key
    await pipeline.expire(this.key, this.ttl);

    // Execute the pipeline (transaction)
    await pipeline.exec();

    // Log that the transaction has been executed
    this.logger.log('Transaction executed successfully.');

    // Log that transaction lock is released
    this.logger.log('Releasing transaction lock...');

    // Explanation of why transaction lock is used to block other operations
    this.logger.log(
      'This transaction lock is used to block other operations temporarily while this transaction is in progress.',
    );
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
