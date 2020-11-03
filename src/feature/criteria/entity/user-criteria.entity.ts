import {
  Entity,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  PrimaryColumn, JoinColumn,
} from 'typeorm';
import { ApiProperty} from '@nestjs/swagger';
import { CriteriaEntity } from './criteria.entity';
import { Expose, plainToClass } from 'class-transformer';
import { UserEntity } from '../../user/entity/user.entity';
import { DefaultEntity } from '../../../share/interface/default.entity';

@Entity('user_criteria')
export class UserCriteriaEntity {
  @ApiProperty()
  @Expose()
  @PrimaryColumn({name: 'date' })
  date: Date;

  @ApiProperty()
  @Expose()
  @PrimaryColumn({name: 'user_id'})
  userId: number;

  @ApiProperty({ type: () => UserEntity })
  @Expose()
  @ManyToOne(() => UserEntity, user => user.userCriterias)
  @JoinColumn({ name: 'user_id' })
  users: UserEntity;

  @ApiProperty()
  @Expose()
  @PrimaryColumn({name: 'criteria_id'})
  criteriaId: number;

  @ApiProperty({ type: () => CriteriaEntity })
  @Expose()
  @ManyToOne(() => CriteriaEntity, criteria => criteria.userCriterias)
  @JoinColumn({ name: 'criteria_id' })
  criterias: CriteriaEntity;

  constructor(user: Partial<UserCriteriaEntity>) {
    if (user) {
      Object.assign(
        this,
        plainToClass(UserCriteriaEntity, user, {
          excludeExtraneousValues: true,
        }));
    }
  }
}
