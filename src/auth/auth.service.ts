import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './user.entity';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD, WRONG_PASSWORD_CHECK } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserSteamDto } from './dto/register-user-steam.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) { }

  async createUser({ email, username, password }: RegisterUserDto) {
    const salt = await genSalt(10);

    const newUser = new UserEntity();
    newUser.email = email;
    newUser.username = username;
    newUser.passwordHash = await hash(password, salt);

    return this.userRepository.save(newUser);
  }

  async createUserSteam({ steamid, username, balance, image }: RegisterUserSteamDto) {
    const newUser = new UserEntity();
    newUser.steamid = steamid;
    newUser.username = username;
    newUser.balance = balance;
    newUser.image = image;

    return this.userRepository.save(newUser);
  }

  async updateEmail(oldEmailOrId: string, newEmail: string) {
    const toUpdate = await this.findUser(oldEmailOrId, oldEmailOrId.includes('@') ? 'email' : 'steamid');

    return this.userRepository.save(Object.assign(toUpdate, { email: newEmail }));
  }

  async findUser(data: string | undefined, findBy: 'email' | 'steamid') {
    return this.userRepository.findOne({ [findBy]: data });
  }

  async validateUser(email: string, passwrod: string): Promise<UserEntity> {
    const user = await this.findUser(email, 'email');
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const isCorrectPassword = await compare(passwrod, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }

    return user;
  }

  async login(emailOrSteamdId: string) {
    const payload = { emailOrSteamdId };
    return {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '10h', secret: 'test' }),
    };
  }

}
