import { Entity, Column, JoinTable, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { DefaultEntity } from '../../../share/interface/default.entity';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { ApiProperty} from '@nestjs/swagger';
import {RoleEntity} from './role.entity';
import { CriteriaEntity } from '../../criteria/entity/criteria.entity';
import { UserCriteriaEntity } from '../../criteria/entity/user-criteria.entity';

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
  @Column({select: false})
  password: string;

  @ApiProperty()
  @Expose()
  @Column({ nullable: true })
  email?: string;

  @ApiProperty()
  @Expose()
  @Column({nullable: true})
  age?: number;

  @ApiProperty()
  @Expose()
  @Column({type: 'tinyint', nullable: true})
  gender?: UserGender;

  @ApiProperty()
  @Expose()
  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'user_role', joinColumn: { name: 'user_id' }, inverseJoinColumn: { name: 'role_id' } })
  roles: RoleEntity[];

  @ApiProperty({ type: () => UserCriteriaEntity })
  @Expose()
  @OneToMany(() => UserCriteriaEntity, usercriteria => usercriteria.users)
  userCriterias: UserCriteriaEntity[];

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

