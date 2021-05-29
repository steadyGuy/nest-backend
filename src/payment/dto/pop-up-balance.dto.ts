import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class PopUpBalanceDto {
  @Min(50, {
    message: 'Минимальная сума для пополнения баланса составляет 50 рублей',
  })
  @Max(10000, {
    message: 'Максимальная сума для пополнения баланса составляет 10000 рублей',
  })
  @IsNumber({}, { message: 'Сума пополнения дожна быть числом' })
  sum: number;
}