import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateReviewDto {
  @MaxLength(50, {
    message: 'Ваш коментарий слишком большой. Максимальная длина 180 символов',
  })
  @MinLength(10, {
    message: 'Ваш коментарий слишком короткий. Миниальная длина 15 символов',
  })
  description: string;

  @IsNumber()
  productId: string;
}