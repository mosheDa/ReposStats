import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';
import { CreateFavoriteDto } from './dto/favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    return this.favoritesService.getAll(req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.create(req.user.email, createFavoriteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Request() req, @Param('id') id: string) {
    return this.favoritesService.delete(req.user.email, id);
  }
}
