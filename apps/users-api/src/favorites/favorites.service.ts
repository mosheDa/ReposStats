import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './schemas/favorite.schema';
import { CreateFavoriteDto } from './dto/favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private readonly favoriteModel: Model<Favorite>,
  ) {}

  async getAll(email: string) {
    return this.favoriteModel.find({ email }).exec();
  }

  async create(email: string, createFavoriteDto: CreateFavoriteDto) {
    const newFavorite = new this.favoriteModel({ ...createFavoriteDto, email });
    return newFavorite.save();
  }

  async delete(email: string, id: string) {
    const favorite = await this.favoriteModel.findOneAndDelete({
      email,
      _id: id,
    });
    if (!favorite) {
      throw new NotFoundException('Favorite repository not found');
    }
    return favorite;
  }
}
