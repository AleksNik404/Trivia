import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { group } from 'console';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';

import {
  TopLevelCategory,
  TopPageModelDocument,
} from './top-page.model/top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel('TopPageModel')
    private readonly topPageModel: Model<TopPageModelDocument>,
  ) {}

  async create(dto: CreateTopPageDto) {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate([
        {
          $match: {
            firstCategory,
          },
        },
        {
          $group: {
            _id: {
              secondCategory: '$secondCategory',
              pages: {
                $push: { alias: '$alias', title: '$title' },
              },
            },
          },
        },
      ])
      .exec();
  }

  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
