import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { LabelType } from '../entity/label.entity';

export class UpdateLabelBody {
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
  type: LabelType | null;
}
