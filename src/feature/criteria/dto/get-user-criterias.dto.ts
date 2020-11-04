import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetUserCriteriasQuery {
  @ApiPropertyOptional()
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  endDate: Date;
}
