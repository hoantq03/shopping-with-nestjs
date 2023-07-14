import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import { CategoryException, ProductException } from 'src/exception';
import { UsersEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import {
  ReqAddCategory,
  ReqAddProduct,
  ResCategoryDto,
  ResProduct,
} from './dto';
import { CategoryEntity, ProductEntity } from './entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
  ) {}

  async addProduct(productInfo: ReqAddProduct): Promise<ResProduct> {
    const user = await this.userRepo.findOne({
      where: { id: productInfo.userId },
    });
    if (!user) {
      ProductException.ownerNotExist();
    }

    const category = await this.categoryRepo.findOne({
      where: { categoryId: productInfo.categoryId },
    });
    if (!category) {
      ProductException.categoryNotExist();
    }
    const productId = ProductEntity.createProductId();
    const productProps = {
      id: productId,
      ...productInfo,
      user,
      category,
    };
    const product = this.productRepo.create(productProps);
    await this.productRepo.save(product);
    return new ResProduct(product);
  }

  async addCategory(categoryInfo: ReqAddCategory) {
    const categories = await this.categoryRepo.find({
      where: { name: categoryInfo.name },
    });
    if (!isEmpty(categories)) {
      CategoryException.categoryExisted();
    }
    const categoryId = CategoryEntity.createCategoryId();
    const createdBy = categoryInfo.userId;
    const updatedBy = categoryInfo.userId;
    const categoryProps = { categoryId, ...categoryInfo, createdBy, updatedBy };
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
