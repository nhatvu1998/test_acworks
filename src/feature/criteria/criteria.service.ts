import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CriteriaEntity, PointType } from './entity/criteria.entity';
import { UserCriteriaEntity } from './entity/user-criteria.entity';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class CriteriaService {
  constructor(
    @InjectRepository(CriteriaEntity)
    private readonly criteriaRepo: Repository<CriteriaEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserCriteriaEntity)
    private readonly userCriteriaRepo: Repository<UserCriteriaEntity>,
    private readonly userService: UserService,
  ) {}

  async getCriteriaByIdOrFail(id: number) {
    try {
      return await this.criteriaRepo.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException('Criteria not found');
    }
  }

  async getManyCriteria(name:string = '', page, limit) {
    return this.criteriaRepo
      .createQueryBuilder('c')
      .where('c.name LIKE :username', {username: `${name}%`})
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async findOneCriteriaById(id:number) {
    return this.criteriaRepo.findOneOrFail({id})
  }

  async getUserCriterias( startDate: Date, endDate: Date, userId: number) {
    console.log(startDate, endDate, userId);
    return this.userRepo
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.userCriterias', 'c')
      .innerJoinAndSelect('c.criterias', 'l')
      .where('u.id = :userId', { userId })
      .andWhere('c.date >= :startDate', {startDate})
      .andWhere('c.date <= :endDate', {endDate})
      .select([
        'u.id',
        'u.fullname',
        'c.date',
        'c.criterias',
        'l.point',
        'l.name',
        'l.type',
      ])
      // .orderBy('c.date', 'DESC')
      .getMany();
  }

  async getManyUserCriterias( startDate: Date, endDate: Date) {
    const users = await this.userRepo
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.userCriterias', 'c')
      .innerJoinAndSelect('c.criterias', 'l')
      .where('c.date >= :startDate', {startDate})
      .andWhere('c.date <= :endDate', {endDate})
      .getMany();
    const result = users.map(user => {
      const totalPoint = user.userCriterias.reduce((total, ele) => (
        ele?.criterias?.type === PointType.Plus ? total + ele?.criterias?.point : total - ele?.criterias?.point
      ), 0)
      return {
        ...user,
        totalPoint,
      }
    })
    return result.sort((a, b) => b.totalPoint - a.totalPoint)
  }

  async createCriteria(name: string, point: number, type: PointType) {
    const criteria = await this.criteriaRepo.findOne({ name });

    if (criteria) {
      throw new BadRequestException('Criteria already exist');
    }

    return this.criteriaRepo.save(new CriteriaEntity({
      name,
      point,
      type,
    }));
  }

  async updateCriteria(
    id: number,
    name: string | null | undefined,
    point: number | null | undefined,
    type: PointType | null | undefined,
  ) {
    const criteria = await this.criteriaRepo.findOne({ id });

    if (!criteria) {
      throw new BadRequestException('Criteria not found');
    }
    criteria.name = name ?? criteria.name;
    criteria.point = point ?? criteria.point;
    criteria.type = type ?? criteria.type;
    return this.criteriaRepo.save(criteria);
  }

  async deleteCriteria(id: number) {
    const criteria = await this.getCriteriaByIdOrFail(id);
    return this.criteriaRepo.remove(criteria);
  }

  async createUserCriteria(userId: number, criteriaIds: number[], date) {
    await this.userService.getUserByIdOrFail(userId);
    if (criteriaIds) {
      return criteriaIds.map(async criteriaId => {
        await this.userCriteriaRepo.save(new UserCriteriaEntity({
          userId,
          criteriaId,
          date
        }))
      })
    }
  }
}
