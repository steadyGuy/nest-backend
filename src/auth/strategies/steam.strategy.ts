import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-steam';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SteamStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      returnURL: `${process.env.HOST_BACKEND}/api/auth/steam/return`,
      realm: `${process.env.HOST_BACKEND}/`,
      apiKey: configService.get('STEAM_API_KEY'),
    });
  }

  async validate(identifier: string, profile: any, done: any): Promise<any> {
    const { steamid, avatarfull } = profile._json;
    const { displayName, } = profile;
    const user = {
      steamid, image: avatarfull, username: displayName, balance: 20
    };
    done(null, user);
  }
}