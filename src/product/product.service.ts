import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { CategoryException } from 'src/exception';
import { Repository } from 'typeorm';
import { ReqAddCategory, ReqAddProduct } from './dto';
import { ResCategoryDto } from './dto/resCategory.dto';
import { ResProduct } from './dto/resProducts.dto';
import { CategoryEntity } from './entity/categories.entity';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async addProduct(productInfo: ReqAddProduct): Promise<ResProduct> {
    const product = this.productRepo.create(productInfo);
    await this.productRepo.save(product);
    console.log(productInfo);
    return new ResProduct(product);
  }

  async addCategory(categoryInfo: ReqAddCategory) {
    const categories = await this.categoryRepo.find({
      where: { name: categoryInfo.name },
    });
    if (!isEmpty(categories)) {
      CategoryException.categoryExisted();
    }
    const categoryId = CategoryEntity.createAddressId();
    const categoryProps = { categoryId, ...categoryInfo };
    const categoryEntity: CategoryEntity = await this.categoryRepo.create(
      categoryProps,
    );
    this.categoryRepo.save(categoryEntity);
    return new ResCategoryDto(categoryEntity);
  }

  async getAllCategory(): Promise<ResCategoryDto[]> {
    return this.categoryRepo.find();
  }

  async deleteCategory(categoryId: string) {
    const category = await this.categoryRepo.findOne({ where: { categoryId } });
    if (!category) {
      CategoryException.categoryNotFound();
    }
    console.log(category.products);
    if (!isEmpty(category.products)) {
      CategoryException.categoryContainProducts();
    }
    await this.categoryRepo.delete(category);

    return {
      message: 'Delete category successfully',
      status: 200,
    };
  }
}
