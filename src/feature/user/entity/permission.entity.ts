import { Column, Entity } from 'typeorm';
import { DefaultEntity } from '../../../share/interface/default.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'permission' })
export class PermissionEntity extends DefaultEntity {
  @Expose()
  @Column()
  scope: PermissionScopes;
}

export enum PermissionScopes {
  ReadUser = 'read_user',
  WriteUser = 'write_user',
  ReadCriteria = 'read_criteria',
  WriteCriteria = 'write_criteria',
  ReadRole = 'read_role',
  WriteRole = 'write_role',
}
