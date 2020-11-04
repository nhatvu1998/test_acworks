import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsInt, IsISO8601, IsNumber } from 'class-validator';

export class CreateUserCriteriaDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty({type: () => [Number]})
  @IsInt({ each: true })
  @ArrayNotEmpty()
  criteriaIds: number[];

  @ApiPropertyOptional()
  @IsISO8601()
  date: Date;

}
