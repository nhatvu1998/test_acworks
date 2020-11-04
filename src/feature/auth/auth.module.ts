import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { AuthController } from './auth.controller';
import {ConfigService} from '../../share/module/config/config.service';
import {ConfigModule} from '../../share/module/config/config.module';
import {PermissionEntity} from '../user/entity/permission.entity';
import { RoleEntity } from '../user/entity/role.entity';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtAuthGuard } from './guard/jwt.guard';
import { RoleGuard } from './guard/role.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PermissionEntity, RoleEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return ({
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES'),
          },
        })
      }
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, RoleGuard, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
