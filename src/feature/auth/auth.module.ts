import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { AuthController } from './auth.controller';
import {ConfigService} from '../../share/module/config/config.service';
import {ConfigModule} from '../../share/module/config/config.module';
import {PermissionEntity} from '../user/entity/permission.entity';
import { RoleEntity } from '../user/entity/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PermissionEntity, RoleEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES'),
        },
      }),
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
