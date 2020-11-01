import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsISO8601, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { LabelEntity } from '../entity/label.entity';

export class CreateCriteriaDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({type: () => [Number]})
  @IsInt({ each: true })
  @ArrayNotEmpty()
  labelIds: number[];

  @ApiPropertyOptional()
  @IsISO8601()
  date: Date;

}
