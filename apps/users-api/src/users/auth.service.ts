import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // User and password match
      return user;
    }
    return null; // User not found or password does not match
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
