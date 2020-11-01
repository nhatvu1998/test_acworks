import {Entity, Column, JoinTable, ManyToMany} from 'typeorm';
import { DefaultEntity } from '../../../share/interface/default.entity';
import { Expose, plainToClass } from 'class-transformer';
import { ApiProperty} from '@nestjs/swagger';

@Entity('label')
export class LabelEntity extends DefaultEntity {
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
  type: LabelType;

  constructor(criteria: Partial<LabelEntity>) {
    super();
    if (criteria) {
      Object.assign(
        this,
        plainToClass(LabelEntity, criteria, {
          excludeExtraneousValues: true,
        }));
    }
  }
}

export enum LabelType {
  Plus,
  Minus,
}

