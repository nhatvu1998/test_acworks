import { Module } from '@nestjs/common';
import { AuthModule } from './feature/auth/auth.module';
import { UserModule } from './feature/user/user.module';
import { ConfigModule } from './share/module/config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfigService } from './share/module/config/typeorm';
import { CriteriaModule } from './feature/criteria/criteria.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfigService,
    }),
    AuthModule,
    UserModule,
    CriteriaModule,
  ]
})
export class AppModule {}
