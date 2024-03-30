import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Favorite extends Document {
  @Prop()
  email: string;

  @Prop()
  url: string;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
