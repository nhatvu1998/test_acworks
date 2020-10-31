import {Entity, Column, JoinTable, ManyToMany} from 'typeorm';
import { DefaultEntity } from '../../../share/interface/default.entity';
import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty} from '@nestjs/swagger';
import {RoleEntity} from './role.entity';

@Entity('user')
export class UserEntity extends DefaultEntity {
  @ApiProperty()
  @Expose()
  @Column()
  username: string;

  @ApiProperty()
  @Expose()
  @Column()
  fullname?: string;

  @ApiProperty()
  @Expose()
  @Column()
  password: string;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  email?: string;

  @ApiProperty()
  @Column({nullable: true})
  age?: number;

  @ApiProperty()
  @Column({type: 'tinyint', nullable: true})
  gender?: UserGender;

  @ApiProperty()
  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'user_role', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'role_id' } })
  roles: RoleEntity[];

  constructor(user: Partial<UserEntity>) {
    super();
    if (user) {
      Object.assign(
        this,
        plainToClass(UserEntity, user, {
          excludeExtraneousValues: true,
        }));
    }
  }
}

export enum UserGender {
  Male,
  Female,
  Others
}

