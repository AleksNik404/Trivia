import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

import { ReviewModelDocument } from './review.model/review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('ReviewModel')
    private readonly reviewModel: Model<ReviewModelDocument>,
  ) {}

  async create(dto: CreateReviewDto): Promise<ReviewModelDocument> {
    return this.reviewModel.create(dto);
  }

  async delete(id: string): Promise<ReviewModelDocument> | null {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findByProductId(productId: string): Promise<ReviewModelDocument[]> {
    // У него по другому productId: Types.ObjectId(productId)
    return this.reviewModel
      .find({
        _id: new Types.ObjectId(productId),
      })
      .exec();
  }

  async deleteByProductId(productId: string) {
    return this.reviewModel.deleteMany({ productId: productId }).exec();
  }
}
