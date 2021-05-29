import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UserEntity } from 'src/auth/user.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ProductEntity } from 'src/product/product.entity';
import { Repository } from 'typeorm';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private authService: AuthService,
  ) { }

  async createComment(productId: number, description: string, emailOrSteamdId: string) {
    const user = await this.authService.findUser(emailOrSteamdId, emailOrSteamdId.includes('@') ? 'email' : 'steamid');
    const userOrderedProducts = (await this.orderRepository.find({ relations: ['product'], where: { user } }))
      .map(order => order.product.id);
    const product = await this.productRepository.findOne({ id: productId });
    const oldReview = await this.reviewRepository.findOne({ user, product });

    if (!product) {
      throw new BadRequestException('Продукт не найден');
    }

    if (!user) {
      throw new BadRequestException('Пользователь не найден');
    }

    if (!userOrderedProducts.includes(+productId)) {
      throw new BadRequestException('Для того, чтобы оставить комментарий к даному продукту, вы должны его приобрести');
    }

    if (oldReview) {
      throw new BadRequestException('Вы можете оставить только один комментарий для конкретного продукта');
    }

    const review = new ReviewEntity();

    review.description = description;
    review.user = user;
    review.product = product;

    await this.reviewRepository.save(review);

    return {
      message: 'Комментарий был успешно добавлен',
      comment: {
        id: review.id,
        description: review.description,
        created_at: review.created_at,
        userImage: review.user.image,
        userName: review.user.username,
      },
    };

  }

  async getReviewsByProduct(productId: number) {
    const product = await this.productRepository.findOne({ id: productId });

    const reviews = (await this.reviewRepository.find({ relations: ['user'], where: { product } }))
      .map(review => {
        return {
          id: review.id,
          description: review.description,
          created_at: review.created_at,
          userImage: review.user.image,
          userName: review.user.username,
        };
      });

    return reviews;
  }

}
