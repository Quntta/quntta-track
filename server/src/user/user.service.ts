import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Logs } from '@/logs/logs.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  find(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  findOne(userid: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userid } });
  }
  async create(user: User): Promise<User> {
    console.log('user', user);
    const userTemp = this.userRepository.create(user);
    return this.userRepository.save(userTemp);
  }
  async update(id: number, user: User): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.find(id);
  }
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
  findProfile(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }

  async findLogs(id: number): Promise<any> {
    const user = await this.find(id);
    if (!user) {
      return null;
    }
    return this.logsRepository.find({
      where: { user },
      relations: {
        user: true,
      },
    });
  }

  findLogsByGroup(id: number): any {
    return this.logsRepository
      .createQueryBuilder('logs')
      .select('logs.result', 'result')
      .addSelect('COUNT(logs.result)', 'count')
      .leftJoinAndSelect('logs.user', 'user')
      .where('user.id = :id', { id })
      .groupBy('logs.result')
      .orderBy('count', 'DESC')
      .getRawMany();
    // return this.logsRepository.query(
    //   'SELECT `logs`.`result` AS `result`, `user`.`id` AS `user_id`, `user`.`userid` AS `user_userid`, `user`.`username` AS `user_username`, COUNT(`logs`.`result`) AS `count` FROM `logs` `logs` LEFT JOIN `user` `user` ON `user`.`id`=`logs`.`userId` WHERE `user`.`id` = ? GROUP BY `logs`.`result` ORDER BY count DESC -- PARAMETERS: [1]',
    // );
  }
}
