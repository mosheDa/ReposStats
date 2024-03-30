import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User, UserSchema } from './users/schemas/user.schema';
import { AuthService } from './users/auth.service';
import { JwtStrategy } from './users/strategies/jwt.strategy';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { FavoritesModule } from './favorites/favorites.module';
import { ExtractUserMiddleware } from './middlewares/extract-user.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FavoritesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategy],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    consumer.apply(ExtractUserMiddleware).forRoutes('*');
  }
}
