import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PointType } from '../entity/criteria.entity';

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
  type: PointType | null;
}
