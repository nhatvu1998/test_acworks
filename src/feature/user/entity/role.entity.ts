import { Entity, Column, JoinTable, ManyToMany } from 'typeorm';
import { DefaultEntity } from '../../../share/interface/default.entity';
import { Expose, plainToClass } from 'class-transformer';
import {PermissionEntity} from './permission.entity';

@Entity('role')
export class RoleEntity extends DefaultEntity {
  @Expose()
  @Column()
  name: string;

  @Expose()
  @ManyToMany(() => PermissionEntity, { nullable: true })
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'role_id' },
    inverseJoinColumn: { name: 'permission_id' },
  })
  permissions: PermissionEntity[];
}

export enum Roles {
  Admin = 'admin',
  User = 'user',
}
