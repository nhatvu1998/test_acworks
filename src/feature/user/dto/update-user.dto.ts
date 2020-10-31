import { IsEmail, IsNumber, IsOptional, IsString, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {UserGender} from '../entity/user.entity';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  username: string

  @IsString()
  @ApiProperty()
  password: string

  @IsString()
  @ApiProperty()
  fullname?: string

  @IsEmail()
  @ApiProperty()
  email?: string

  @IsNumber()
  @ApiProperty()
  age?: number

  @IsNumber()
  @ApiProperty()
  gender?: UserGender
}
