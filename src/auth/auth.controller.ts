import {
  BadRequestException, Body, Controller, HttpCode, Post,
  UseGuards, UsePipes, ValidationPipe, Request, Get, Req, UnauthorizedException
} from '@nestjs/common';
import { ALREADY_REGISTERED_ERROR, EMAIL_IN_USE, USER_NOT_FOUND, WRONG_PASSWORD_CHECK } from './auth.constants';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { SteamAuthGuard } from './guards/steam.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserData } from './decorators/user-data.decorator';
import { UpdateEmailDto } from './dto/update-email.dto';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    if (dto.password !== dto.password2) {
      throw new BadRequestException(WRONG_PASSWORD_CHECK);
    }

    let user = await this.authService.findUser(dto.email, 'email');
    if (user) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    user = await this.authService.createUser(dto);
    const token = await this.authService.login(dto.email);

    return { balance: user.balance, image: user.image, ...token };
  }

  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async login(@Body() { email, password }: LoginUserDto) {
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.login(user.email);
    return { balance: user.balance, image: user.image, ...token };
  }

  @UseGuards(SteamAuthGuard)
  @Get('steam')
  @HttpCode(200)
  async steamLogin() { }

  @UseGuards(SteamAuthGuard)
  @Get('steam/return')
  async steamLoginCallback(@Req() req: any) {
    const { steamid, username, image, balance } = req.user;

    let user = await this.authService.findUser(steamid, 'steamid');
    if (!user) {
      user = await this.authService.createUserSteam({ steamid, username, image, balance });
    }
    const token = await this.authService.login(steamid);

    return `<script>window.opener.postMessage(${JSON.stringify({ ...token, steamid, username, image, balance })}, 'https://nextjs-4keys.vercel.app'); window.close();</script>`;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req: any) {
    const id = req.user.emailOrSteamdId;
    const user = await this.authService.findUser(id, id.includes('@') ? 'email' : 'steamid');
    if (!user) { return null; }

    return {
      balance: user.balance, image: user.image, id: user.id, username: user.username,
      email: user.email, steamid: user.steamid, orders: user.orders, wastedBalance: user.wastedBalance
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-email')
  @UsePipes(new ValidationPipe())
  async updateEmail(@Body() dto: UpdateEmailDto, @Req() req: any) {
    const userToUpdate = await this.authService.findUser(dto.email, 'email');

    const id = req.user.emailOrSteamdId;
    const user = await this.authService.findUser(id, id.includes('@') ? 'email' : 'steamid');

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    if (userToUpdate?.email && userToUpdate?.email !== user.email) {
      throw new UnauthorizedException(EMAIL_IN_USE);
    }

    const newUser = await this.authService.updateEmail(req.user.emailOrSteamdId, dto.email);
    return { email: newUser.email, message: 'Успешно обновлено' };
  }
}
