import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

Schema({ _id: false });
export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}
export const HhDataSchema = SchemaFactory.createForClass(HhData);

Schema({ _id: false });
export class TopPageAdvantages {
  @Prop()
  title: string;

  @Prop()
  description: string;
}
export const TopPageAdvantagesSchema =
  SchemaFactory.createForClass(TopPageAdvantages);

///////////////////////////////////////////////////////////////////////////////////////////////

Schema({ timestamps: true });
export class TopPageModel {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop({ type: HhDataSchema })
  hh?: HhData;

  @Prop({ type: [TopPageAdvantagesSchema] })
  advantages: TopPageAdvantages[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: [String] })
  tags: string[];
}

export type TopPageModelDocument = HydratedDocument<TopPageModel>;
export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
