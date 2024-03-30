import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, 'secretKey', {
      expiresIn: '1h',
    });
    return { token };
  }
}
