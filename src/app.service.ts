import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  all(): string {
    return 'Hello Gang1!';
  }
}
