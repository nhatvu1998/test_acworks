import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { LabelType } from '../entity/label.entity';

export class CreateLabelBody {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsNumber()
  point: number;

  @ApiPropertyOptional()
  @IsNumber()
  type: LabelType;
}
