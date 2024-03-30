import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IRepo } from './interfaces/repo.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('top-starred-repos')
  async getTopStarredRepos(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<IRepo[]> {
    return await this.appService.getTopStarredRepos(page, perPage);
  }

  @Post('populate-repos')
  async populateRepos(): Promise<string> {
    await this.appService.populateTopStarredRepos();
    return 'Repositories populated successfully!';
  }
}
