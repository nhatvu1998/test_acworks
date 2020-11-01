import { ApiPropertyOptional } from '@nestjs/swagger';
import { PagingQuery } from '../../../share/interface/paging.interface';
import { IsOptional, IsString } from 'class-validator';

export class GetLabelsQuery extends PagingQuery {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name: string;
}
