import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers(): any {
    return {
      code: 0,
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
      ],
      message: 'success',
    };
  }
  addUser(user: any): any {
    console.log('User added:', user);
    return {
      code: 0,
      data: null,
      message: 'success',
    };
  }
}
