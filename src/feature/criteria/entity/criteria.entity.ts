import { Entity, Column, JoinTable, ManyToMany, ManyToOne, RelationId } from 'typeorm';
import { DefaultEntity } from '../../../share/interface/default.entity';
import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty} from '@nestjs/swagger';
import { LabelEntity } from './label.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { IsISO8601 } from 'class-validator';

@Entity('criteria')
export class CriteriaEntity extends DefaultEntity {
  @ApiProperty()
  @Expose()
  @Column()
  name: string;

  @ApiProperty()
  @Expose()
  @Column()
  description: string;

  @ApiProperty()
  @Expose()
  @Column({name: 'total_point' })
  totalPoint: number;

  @ApiProperty()
  @Expose()
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, u => u.criteria)
  user: UserEntity;

  @ApiProperty({ type: () => LabelEntity })
  @Expose()
  @ManyToMany(() => LabelEntity)
  @JoinTable({ name: 'criteria_label', joinColumn: { name: 'criteria_id' }, inverseJoinColumn: { name: 'label_id' } })
  labels: LabelEntity[];

  @ApiProperty()
  @Expose()
  @RelationId((criteria: CriteriaEntity) => criteria.labels)
  labelIds: number[];

  @ApiProperty()
  @Expose()
  @Column({ type: 'timestamp'})
  date: Date;

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
