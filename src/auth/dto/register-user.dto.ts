import { IsEmail, IsEmpty, IsString, Length } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  @Length(4, 30, {
    message: 'Имя пользователя от 4 до 30 символов',
  })
  readonly username: string;

  @IsString()
  @IsEmail({}, { message: 'Неверный email' })
  readonly email: string;

  @IsString()
  @Length(6, 30, {
    message: 'Пароль должен быть больще 6 символов',
  })
  readonly password: string;

  @IsString()
  readonly password2: string;

}