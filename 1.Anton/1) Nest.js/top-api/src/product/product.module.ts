import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.model/product.model';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ProductModel',
        schema: ProductSchema,
        collection: 'Product',
      },
    ]),
  ],
  providers: [ProductService],
})
export class ProductModule {}
