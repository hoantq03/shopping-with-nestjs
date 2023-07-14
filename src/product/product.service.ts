import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isEmpty } from 'lodash';
import {
  CategoryException,
  ProductException,
  UserException,
} from 'src/exception';
import { UsersEntity } from 'src/user/entity';
import { Repository } from 'typeorm';
import {
  ReqAddCategory,
  ReqAddProduct,
  ReqUpdateProduct,
  ResCategoryDto,
  ResProductDto,
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

  async addProduct(productInfo: ReqAddProduct): Promise<ResProductDto> {
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
    return new ResProductDto(product);
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

  async getAllProducts(page: number): Promise<ResProductDto[]> {
    const numProductsPerPage: number = Number.parseInt(
      process.env.NUMBER_PRODUCT_PER_PAGE,
    );

    const [result, total] = await this.productRepo.findAndCount({
      order: { name: 'DESC' },
      take: numProductsPerPage,
      skip: page,
      relations: ['category', 'user'],
    });
    const resProduct = [];
    result.forEach((res) => {
      resProduct.push(new ResProductDto(res));
    });

    return resProduct;
  }

  async findProductById(id: string): Promise<ProductEntity | null> {
    return this.productRepo.findOne({
      where: { id },
      relations: ['user', 'category'],
    });
  }

  async getOneProduct(productId: string): Promise<ResProductDto> {
    const product = await this.findProductById(productId);
    return new ResProductDto(product);
  }
  async updateProduct(
    productProps: ReqUpdateProduct,
    producId: string,
  ): Promise<ResProductDto> {
    const oldProduct = await this.findProductById(producId);

    if (oldProduct.user.id !== productProps.userId) {
      UserException.permission();
    }
    if (!oldProduct) {
      ProductException.productNotFound();
    }
    if (oldProduct.category.categoryId !== productProps.categoryId) {
      const category = await this.categoryRepo.findOne({
        where: { categoryId: productProps.categoryId },
      });
      oldProduct.category = category;
    }

    oldProduct.name = productProps.name ?? oldProduct.name;
    oldProduct.description = productProps.description ?? oldProduct.description;
    oldProduct.color = productProps.color ?? oldProduct.color;
    oldProduct.discount = productProps.discount ?? oldProduct.discount;
    oldProduct.imageUrl = productProps.imageUrl ?? oldProduct.imageUrl;
    oldProduct.price = productProps.price ?? oldProduct.price;
    oldProduct.quantityInStock =
      productProps.quantityInStock ?? oldProduct.quantityInStock;
    this.productRepo.save(oldProduct);
    return new ResProductDto(oldProduct);
  }
}
