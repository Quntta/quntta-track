import { Controller, Get, Query } from '@nestjs/common';
import { RangeService } from './range.service';

@Controller('range')
export class RangeController {
  constructor(private rangeService: RangeService) {}
  @Get()
  getRangeList(@Query() query: any): any {
    return this.rangeService.getRangeList(query);
  }
}
