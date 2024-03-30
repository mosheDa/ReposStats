import { Injectable } from '@nestjs/common';
import { ReposService } from './repos/repos.service';
import { IRepo } from './interfaces/repo.interface';

@Injectable()
export class AppService {
  constructor(private readonly reposService: ReposService) {}

  async getTopStarredRepos(page: number, perPage: number): Promise<IRepo[]> {
    return await this.reposService.getTopStarredRepos(page, perPage);
  }

  async populateTopStarredRepos(): Promise<void> {
    await this.reposService.populateTopStarredRepos(true);
  }
}
