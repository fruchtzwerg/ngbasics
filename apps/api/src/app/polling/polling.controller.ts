import { Controller, Get } from '@nestjs/common';
import { timer } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';

@Controller('polling')
export class PollingController {
  private counter$ = timer(0, 1000).pipe(shareReplay(1));

  @Get()
  counter() {
    return this.counter$.pipe(take(1));
  }
}
