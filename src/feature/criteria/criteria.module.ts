import { Module } from '@nestjs/common';
import { CriteriaController } from './controller/criteria.controller';
import { CriteriaService } from './criteria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriteriaEntity } from './entity/criteria.entity';
import { LabelEntity } from './entity/label.entity';
import { UserModule } from '../user/user.module';
import { LabelController } from './controller/label.controller';


@Module({
  imports: [TypeOrmModule.forFeature([CriteriaEntity, LabelEntity]), UserModule],
  controllers: [CriteriaController, LabelController],
  providers: [CriteriaService]
})
export class CriteriaModule {}
