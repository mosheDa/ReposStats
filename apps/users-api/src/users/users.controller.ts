import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
