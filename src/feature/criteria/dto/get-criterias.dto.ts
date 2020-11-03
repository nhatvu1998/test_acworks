import { ApiPropertyOptional } from '@nestjs/swagger';
import { PagingQuery } from '../../../share/interface/paging.interface';
import { IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUserCriteriasQuery {
  @ApiPropertyOptional()
  @IsOptional()
  startDate: Date;

  @ApiPropertyOptional()
  @IsOptional()
  endDate: Date;
}
