import { Entity, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from '../../../share/interface/default.entity';
import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty} from '@nestjs/swagger';
import { UserCriteriaEntity } from './user-criteria.entity';

@Entity('criteria')
export class CriteriaEntity extends DefaultEntity {
  @ApiProperty()
  @Expose()
  @Column()
  name: string;

  @ApiProperty()
  @Expose()
  @Column()
  point: number;

  @ApiProperty()
  @Expose()
  @Column({type: 'tinyint'})
  type: PointType;

  @ApiProperty({ type: () => UserCriteriaEntity })
  @OneToMany(() => UserCriteriaEntity, usercriteria => usercriteria.criterias)
  userCriterias: UserCriteriaEntity[];


  constructor(criteria: Partial<CriteriaEntity>) {
    super();
    if (criteria) {
      Object.assign(
        this,
        plainToClass(CriteriaEntity, criteria, {
          excludeExtraneousValues: true,
        }));
    }
  }
}

export enum PointType {
  Minus,
  Plus,
}
