import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { CriteriaType } from '../entity/criteria.entity';

export class UpdateCriteriaBody {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string | null;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  point: number | null;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  type: CriteriaType | null;
}
