import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IRepo } from '../interfaces/repo.interface';

@Injectable()
export class GitHubApiService {
  private readonly githubApiEndpoint: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.githubApiEndpoint = this.configService.get<string>(
      'GITHUB_API_ENDPOINT',
    );
  }

  async getTopStarredRepos(limit: number = 30): Promise<IRepo[]> {
    const accessToken = this.configService.get<string>('GITHUB_ACCESS_TOKEN');
    const minStars = parseInt(this.configService.get<string>('MIN_REPO_STARS'));

    const response = await this.httpService
      .get(this.githubApiEndpoint, {
        params: {
          q: `stars:>${minStars}`,
          sort: 'stars',
          order: 'desc',
          per_page: limit, // assuming limit <= max items per page
        },
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })
      .toPromise();
    return response.data.items.map(this.mapRepoData);
  }

  mapRepoData({ html_url: url, stargazers_count: stars }): IRepo {
    return { url, stars };
  }
}
