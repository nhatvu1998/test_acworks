import {IsInt, Min} from 'class-validator';
import {Transform} from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PagingQuery {
  @ApiPropertyOptional()
  @Transform(value => Number(value))
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional()
  @Transform(value => Number(value))
  @IsInt()
  @Min(1)
  limit: number = 50;
}
