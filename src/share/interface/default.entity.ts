import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export abstract class DefaultEntity {
  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @ApiProperty()
  @CreateDateColumn({ select: false, name: 'created_at' })
  createdAt: Date;

  @Exclude()
  @ApiProperty()
  @UpdateDateColumn({ select: false, name: 'updated_at' })
  updatedAt: Date;
}
