import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Logs } from './Logs';
import { Profile } from './Profile';
import { Roles } from './Roles';

@Entity('user', { schema: 'quntta' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'userid', length: 255 })
  userid: string;

  @Column('varchar', { name: 'username', length: 255 })
  username: string;

  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @ManyToMany(() => Roles, (roles) => roles.users)
  roles: Roles[];
}
