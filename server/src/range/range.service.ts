import { Injectable } from '@nestjs/common';

@Injectable()
export class RangeService {
  getRangeList(query: any): any {
    const { num } = query;
    const num_ = Number(num);
    const res: { code: number; data: Array<string | number>; message: string } =
      {
        code: 0,
        data: [],
        message: 'success',
      };
    if (num && !isNaN(num_)) {
      if (num_ < 10 && num_ > 0) {
        const list = [];
        for (let i = 1; i <= num_; i++) {
          list.push(String(i));
        }
        res.data = list;
      }
    } else {
      res.message = 'failed';
    }
    console.log('query:', query);
    return res;
  }
}
