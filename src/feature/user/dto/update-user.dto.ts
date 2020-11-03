import { IsNumber, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {UserGender} from '../entity/user.entity';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  username: string

  @ApiPropertyOptional()
  @IsString()
  fullname?: string

  @ApiPropertyOptional()
  @IsString()
  email?: string

  @ApiPropertyOptional()
  @IsNumber()
  age?: number

  @ApiPropertyOptional()
  @IsNumber()
  gender?: UserGender
}
