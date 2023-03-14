import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getGoToIncHello(): string {
    return 'Hello GoToInc!';
  }
}
