import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

Schema();
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

Schema();
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

  @Prop({ type: HhDataSchema, _id: false })
  hh?: HhData;

  @Prop({ type: [TopPageAdvantagesSchema], _id: false })
  advantages: TopPageAdvantages[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: [String] })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
