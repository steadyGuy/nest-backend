import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserEntity } from 'src/auth/user.entity';
import { OrderEntity } from 'src/order/order.entity';
import { AccountEntity } from 'src/product/account.entity';
import { KeyEntity } from 'src/product/key.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { NOT_ENOUGH_BALANCE, OUT_OF_STOCK_ACCOUNTS, OUT_OF_STOCK_KEYS, SOME_FIELDS_NOT_EXISTS, UNKNOWN_ORDER_TYPE, USER_NOT_FOUND } from './payment.constants';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(KeyEntity)
    private readonly keyRepository: Repository<KeyEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) { }

  async confirmOrder(email: string, productId: number, type: string): Promise<any> {
    // let start = new Date();
    // console.log('Start', start)
    const user = await this.userRepository.findOne({ relations: ['orders'], where: { email } });
    // console.log('END', start)
    const product = await this.productRepository.findOne({ id: productId });

    if (!product) {
      throw new BadRequestException(SOME_FIELDS_NOT_EXISTS);
    }
    if (!user) {
      throw new BadRequestException(USER_NOT_FOUND);
    }

    if (user.balance < product.price) {
      throw new BadRequestException(NOT_ENOUGH_BALANCE);
    }

    const order = new OrderEntity();

    if (type === 'key') {

      if (product.keys.length === 0) {
        throw new BadRequestException(OUT_OF_STOCK_KEYS);
      }

      order.key = product.keys.shift() as KeyEntity;
    } else if (type === 'account') {

      if (product.accounts.length === 0) {
        throw new BadRequestException(OUT_OF_STOCK_ACCOUNTS);
      }

      order.account = product.accounts.shift() as AccountEntity;
    } else {
      throw new BadRequestException(UNKNOWN_ORDER_TYPE);
    }

    order.user = user;
    order.product = product;
    user.orders = [...user.orders, order];

    product.orders.push(order);
    await this.orderRepository.save(order);

    await this.productRepository.save(product);

    user.balance = Number(user.balance) - Number(product.price);
    user.wastedBalance = Number(user.wastedBalance) + Number(product.price);

    await this.userRepository.save(user);


    return { message: 'Товар был успешно приобретен' };
  }

  async popUpBalance(emailOrSteamdId: string, sum: number): Promise<any> {
    const user = await this.userRepository.findOne(
      { [emailOrSteamdId.includes('@') ? 'email' : 'steamid']: emailOrSteamdId }
    );

    if (!user) {
      throw new BadRequestException('Пользователь не был найден. Перезапустите страницу.');
    }

    user.balance += sum;

    await this.userRepository.save(user);

    return { message: `Баланс был успешно пополнен на ${sum} ₽`, balance: sum, };
  }


}


