import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabelEntity, LabelType } from './entity/label.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CriteriaEntity } from './entity/criteria.entity';

@Injectable()
export class CriteriaService {
  constructor(
    @InjectRepository(LabelEntity)
    private readonly labelRepo: Repository<LabelEntity>,
    @InjectRepository(CriteriaEntity)
    private readonly criteriaRepo: Repository<CriteriaEntity>,
    private readonly userService: UserService,
  ) {}

  async getCriteriaByIdOrFail(id: number) {
    try {
      return await this.criteriaRepo.findOneOrFail(id);
    } catch (e) {
      throw new NotFoundException('Criteria not found');
    }
  }

  async getLabels() {
    return this.labelRepo.find({})
  }

  async getCriterias(name: string= '', limit: number = 20, page: number = 1) {
    return this.criteriaRepo
      .createQueryBuilder('u')
      .innerJoinAndSelect('u.labels', 'r')
      .andWhere('u.username LIKE :username', {username: `${name}%`})
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();
  }

  async createLabel(name: string, point: number, type: LabelType) {
    const label = await this.labelRepo.findOne({ name });

    if (label) {
      throw new BadRequestException('Label already exist');
    }

    return this.labelRepo.save(new LabelEntity({
      name,
      point,
      type,
    }));
  }

  async updateLabel(
    id: number,
    name: string | null | undefined,
    point: number | null | undefined,
    type: LabelType | null | undefined,
  ) {
    const label = await this.labelRepo.findOne({ id });

    if (!label) {
      throw new BadRequestException('Label not found');
    }
    label.name = name ?? label.name;
    label.point = point ?? label.point;
    label.type = type ?? label.type;
    return this.labelRepo.save(label);
  }

  async deleteLabel(id: number) {
    const label = await this.labelRepo.findOne({ id });

    if (!label) {
      throw new BadRequestException('Label not found');
    }
    return this.labelRepo.remove(label);
  }

  async createCriteria(name: string, description: string, userId: number, labelIds: number[], date) {
    const [user, labels] = await Promise.all([
      this.userService.getUserByIdOrFail(userId),
      this.labelRepo.findByIds(labelIds),
    ])

    const totalPoint = labels.reduce((total, label) => {
      return (label.type === LabelType.Plus ) ? (total + label.point) : (total - label.point)
    }, 0)
    console.log(totalPoint);

    return this.criteriaRepo.save(new CriteriaEntity({
      name,
      description,
      date,
      labels,
      totalPoint
    }))
  }

  async updateCriteria(
    id: number,
    name: string | null | undefined,
    description: string | null | undefined,
    labelIds: number[],
    date: Date | null | undefined,
  ) {
    const [criteria, labels] = await Promise.all([
      this.getCriteriaByIdOrFail(id),
      this.labelRepo.findByIds(labelIds)
      ])

    criteria.name = name ?? criteria.name;
    criteria.description = description ?? criteria.description;
    criteria.labels = labels ?? criteria.labels;
    criteria.date = date ?? criteria.date;
    return this.criteriaRepo.save(criteria);
  }

  async deleteCriteria(id: number) {
    const criteria = await this.getCriteriaByIdOrFail(id);
    return this.criteriaRepo.remove(criteria);
  }
}
