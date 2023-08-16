import { Controller, Delete, Get, Post, Patch } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  all(): string {
    return this.appService.all();
  }
}
