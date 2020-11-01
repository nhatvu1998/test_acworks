import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { LabelType } from '../entity/label.entity';

export class UpdateCriteriaBody {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({type: () => [Number]})
  @IsInt({ each: true })
  @ArrayNotEmpty()
  labelIds: number[];

  @ApiPropertyOptional()
  @IsISO8601()
  @IsOptional()
  date: Date;

}
