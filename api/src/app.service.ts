import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  Doc(): string {
    return 'Ordery API: \n/order => GET, POST, PATCH, DELETE\n';
  }
}
