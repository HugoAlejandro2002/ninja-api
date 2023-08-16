import { Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import { UseGuards} from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('my-endpoint')
  @UseGuards(AuthGuard('basic'))
  findOne() {
    return "hola"
  }
}
