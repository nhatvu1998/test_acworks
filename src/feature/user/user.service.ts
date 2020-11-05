import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserSession } from 'src/share/interface/session.interface';
import { verify } from 'jsonwebtoken';
import { genSalt, hash } from 'bcrypt';
import {ConfigService} from '../../share/module/config/config.service';
import {RoleEntity, Roles} from './entity/role.entity';
import { PermissionEntity, PermissionScopes } from './entity/permission.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
    private readonly configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.initRoles();
    await this.initAdmin();
    await this.initUsers();
  }

  async getUserByIdOrFail(id: number) {
    try {
      return await this.userRepo.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }

  async getUsers(username: string = '', page: number = 1, limit: number = 20) {
    return this.userRepo
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.roles', 'r')
      .innerJoinAndSelect('r.permissions', 'p')
      .where('u.username != :admin', {
        admin: 'admin',
      })
      .andWhere('u.username LIKE :username', {username: `${username}%`})
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findOneById(id: number) {
    return this.userRepo
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.roles', 'r')
      .innerJoinAndSelect('r.permissions', 'p')
      .where('u.id = :userId', {
        userId: id,
      })
      .getOne()
  }

  async findOneByName(username: string) {
    return this.userRepo
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.roles', 'r')
      .where('u.username = :username', { username })
      .getOne();
  }

  async decodeToken(token: string): Promise<any> {
    const secretKey = this.configService.get('JWT_SECRET')
    const decoded = verify(token, secretKey);
    const { userId } = decoded as UserSession;
    return { userId };
  }

  async createUser(username: string, password: string, otherInfo?: Pick<UserEntity, 'age' | 'email' | 'fullname' | 'gender'>, isAdmin?: boolean) {
    const existedUser = await this.userRepo.findOne({ username });
    if (existedUser) {
      throw new BadRequestException('username already existed');
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    let userRoles;
    if (isAdmin) {
      const adminRole = await this.roleRepo.findOne({ name: Roles.Admin });
      userRoles = adminRole ? [adminRole] : [];
    } else {
      const guestRole = await this.roleRepo.findOne({ name: Roles.User });
      userRoles = guestRole ? [guestRole] : [];
    }

    const user = new UserEntity({
      username,
      password: hashedPassword,
      fullname: otherInfo?.fullname,
      email: otherInfo?.email,
      age: otherInfo?.age,
      gender: otherInfo?.gender,
      roles: userRoles,
    });

    return this.userRepo.save(user);
  }

  async updateUser(userId: number, updateInfo: Pick<UserEntity, 'username' | 'age' | 'email' | 'gender' | 'fullname'>) {
    const user = await this.userRepo.findOne({ id: userId })
    if (!user) {
      throw new BadRequestException('User not found');
    }
    user.username = updateInfo.username ?? user.username;
    user.age = updateInfo.age ?? user.age;
    user.email = updateInfo.email ?? user.email;
    user.gender = updateInfo.gender ?? user.gender;
    user.fullname = updateInfo.fullname ?? user.fullname;

    return this.userRepo.save(user);
  }

  async deleteUser(userId: number) {
    const user = await this.userRepo.findOne({ id: userId })
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userRepo.remove(user);
  }

  private async initAdmin() {
    const adminUsername = this.configService.get('ADMIN_USERNAME');
    const adminPassword = this.configService.get('ADMIN_PASSWORD');

    const user = await this.findOneByName(adminUsername);

    if (!user) {
      return this.createUser(adminUsername, adminPassword, undefined, true);
    }
  }

  private async initUsers() {
    for(let i= 1; i <= 10; i++) {
     const user = await this.findOneByName(`user${i}`);
     if (!user) {
       await this.createUser(`user${i}`, '123', {
         fullname: `user ${i}`,
         email: `user${i}@gmail.com`,
         age: Math.floor(Math.random() * 50) + 1,
         gender: Math.floor(Math.random() * 2)
       }, false);
     }
   }
  }

  private async initRoles() {
    let permissionList
    if (!(await this.permissionRepo.findOne())) {
      permissionList = Object.values(PermissionScopes).map(async value => {
          const permission = new PermissionEntity();
          permission.scope = value;
          return await this.permissionRepo.save(permission);
        })
      await Promise.all(permissionList)
    }
    if (!(await this.roleRepo.findOne())) {
      const userPermission = (
        await Promise.all([
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.ReadUser } }),
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.ReadRole } }),
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.ReadCriteria } }),
        ])
      ).filter((permission): permission is Required<PermissionEntity> => permission !== undefined);

      const adminPermission = (
        await Promise.all([
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.ReadUser } }),
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.WriteUser } }),
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.ReadRole } }),
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.WriteRole } }),
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.ReadCriteria } }),
          this.permissionRepo.findOne({ where: { scope: PermissionScopes.WriteCriteria } }),
        ])
      ).filter((permission): permission is Required<PermissionEntity> => permission !== undefined);
      await Promise.all([
        this.roleRepo.save({ name: Roles.Admin, permissions: adminPermission }),
        this.roleRepo.save({ name: Roles.User, permissions: userPermission }),
      ]);
    }
  }
}
