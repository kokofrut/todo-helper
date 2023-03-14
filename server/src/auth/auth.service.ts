import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';

import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }


  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && compareSync(password, user.password)) {
      const { password: string, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async findAllUsernames() {
    const usernames= await this.userService.findAll()
    return usernames.map(user => user.dataValues.username)
  }

  getUserService() {
    return this.userService;
  }

  async login(user: User) {
    const payload = { userId: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async refreshAccessToken(currentToken: string) {
    try {
      const decodedToken = this.jwtService.decode(currentToken) as any;
      const userId = decodedToken?.userId;

      if (!userId) throw new Error('Invalid token');

      const user = await this.userService.findById(userId);
      if (!user) throw new Error('User not found');

      delete decodedToken.iat;
      delete decodedToken.exp;
      const newToken = this.jwtService.sign({
        ...decodedToken,
        userId: user.id,
      }); //signing with new user id

      return { accessToken: newToken };
    } catch (error) {
      throw new Error(`Unable to refresh token: ${error.message}`);
    }
  }
}
