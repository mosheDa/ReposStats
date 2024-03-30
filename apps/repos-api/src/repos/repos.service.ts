import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { GitHubApiService } from '../github/github-api.service';
import { IRepo } from '../interfaces/repo.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReposService {
  private readonly logger = new Logger(ReposService.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly gitHubApiService: GitHubApiService,
    private readonly configService: ConfigService,
  ) {}

  async populateTopStarredRepos(forceUpdate: boolean = false) {
    const expectedReposCount = parseInt(
      this.configService.get<string>('EXPECTED_REPOS_COUNT'),
    );

    const redisRepoCount = await this.redisService.getRepoCount();

    this.logger.log(`Redis repository count: ${redisRepoCount}`);

    if (forceUpdate || redisRepoCount < expectedReposCount) {
      this.logger.log(`Fetching top starred repositories from GitHub...`);
      const repos =
        await this.gitHubApiService.getTopStarredRepos(expectedReposCount);
      this.logger.log(`Retrieved ${repos.length} repositories from GitHub.`);

      this.logger.log(`Adding repositories to Redis...`);
      for (const repo of repos) {
        await this.redisService.addRepo(repo.url, repo.stars);
      }
      this.logger.log(`Repositories added to Redis.`);
    } else {
      this.logger.log(`No need to fetch repositories from GitHub.`);
    }
  }

  async getTopStarredRepos(page: number, perPage: number): Promise<IRepo[]> {
    await this.populateTopStarredRepos();
    // assuming TTL is not expired between this 2 operations
    const start = (page - 1) * perPage;
    const end = start + perPage - 1;
    return await this.redisService.getTopStarredRepos(start, end);
  }
}
