import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getGoToIncHello(): string {
    return this.appService.getGoToIncHello();
  }
}
