import { Module } from '@nestjs/common';
import { AuthModule } from './feature/auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { ConfigModule } from './share/module/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './share/module/config/typeorm';
import { JwtStrategy } from './feature/auth/strategy/jwt.strategy';
import { CriteriaModule } from './feature/criteria/criteria.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfigService,
    }),
    // GraphQLModule.forRootAsync({
    //   useClass: GqlConfigService,
    // }),
    AuthModule,
    UserModule,
    CriteriaModule,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
