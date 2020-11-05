import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {UserGender} from '../../user/entity/user.entity';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fullname?: string

  @ApiPropertyOptional()
  @IsEmail()
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
