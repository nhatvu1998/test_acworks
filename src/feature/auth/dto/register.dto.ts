import { IsEmail, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {UserGender} from '../../user/entity/user.entity';

export class RegisterDto {
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
