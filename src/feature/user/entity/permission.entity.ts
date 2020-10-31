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
  ReadProject = 'read_project',
  WriteProject = 'write_project',
  ReadEpic = 'read_epic',
  WriteEpic = 'write_epic',
  ReadIssue = 'read_issue',
  WriteIssue = 'write_issue',
  ReadSprint = 'read_sprint',
  WriteSprint = 'write_sprint',
  ReadRole = 'read_role',
  WriteRole = 'write_role',
}
