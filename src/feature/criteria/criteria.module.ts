import { Module } from '@nestjs/common';
import { CriteriaController } from './controller/criteria.controller';
import { CriteriaService } from './criteria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriteriaEntity } from './entity/criteria.entity';
import { UserModule } from '../user/user.module';
import { UserCriteriaEntity } from './entity/user-criteria.entity';
import { UserCriteriaController } from './controller/user-criteria.controller';
import { UserEntity } from '../user/entity/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CriteriaEntity, UserCriteriaEntity, UserEntity]), UserModule],
  controllers: [CriteriaController, UserCriteriaController],
  providers: [CriteriaService]
})
export class CriteriaModule {}
