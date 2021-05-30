import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserEntity } from './user.entity';
import { genSalt, hash, compare } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD, WRONG_PASSWORD_CHECK } from './auth.constants';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserSteamDto } from './dto/register-user-steam.dto';
import { OrderEntity } from 'src/order/order.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
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
    const payload = { emailOrSteamdId, };
    return {
      access_token: await this.jwtService.signAsync(payload, { expiresIn: '24h', secret: 'test' }),
    };
  }

  async orders(emailOrSteamdId: string) {
    const user = await this.findUser(emailOrSteamdId, emailOrSteamdId.includes('@') ? 'email' : 'steamid');

    if (!user?.email) {
      throw new BadRequestException('Пользователя с таким email нет');
    }

    console.log('START')
    const orders = await this.orderRepository.find({ relations: ['key', 'account', 'product'], where: { user } });
    console.log('END')
    console.log(orders)
    return orders.map(o => {
      return {
        id: o.id, key: o.key?.code, date: o.created_at,
        account: o.account, platform: o.product.platform?.name, title: o.product.title,
      };
    });
  }

  async balance() {
    return this.userRepository.find({ relations: ['orders'] });
  }

}
