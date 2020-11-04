import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {UserGender} from '../entity/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  username: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fullname?: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  email?: string

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  age?: number

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  gender?: UserGender
}
