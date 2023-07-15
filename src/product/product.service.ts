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
    const user: UsersEntity = await this.userRepo.findOne({
      where: { id: productInfo.userId },
    });

    if (!user) ProductException.ownerNotExist();

    const category = await this.categoryRepo.findOne({
      where: { categoryId: productInfo.categoryId },
    });

    if (!category) ProductException.categoryNotExist();

    const productId: string = ProductEntity.createProductId();

    const productProps: ProductEntity = {
      id: productId,
      ...productInfo,
      user,
      category,
    };

    const product: ProductEntity = this.productRepo.create(productProps);
    await this.productRepo.save(product);
    return new ResProductDto(product);
  }

  async addCategory(categoryInfo: ReqAddCategory): Promise<ResCategoryDto> {
    const categories: CategoryEntity[] = await this.categoryRepo.find({
      where: { name: categoryInfo.name },
    });

    if (!isEmpty(categories)) CategoryException.categoryExisted();

    const categoryId: string = CategoryEntity.createCategoryId();
    const createdBy: string = categoryInfo.userId;
    const updatedBy: string = categoryInfo.userId;

    const categoryProps: CategoryEntity = {
      categoryId,
      ...categoryInfo,
      createdBy,
      updatedBy,
      products: [],
    };
    const category: CategoryEntity = await this.categoryRepo.create(
      categoryProps,
    );

    await this.categoryRepo.save(category);
    return new ResCategoryDto(category);
  }

  async getAllCategory(): Promise<ResCategoryDto[]> {
    return this.categoryRepo.find();
  }

  async deleteCategory(categoryId: string) {
    const category: CategoryEntity = await this.categoryRepo.findOne({
      where: { categoryId },
    });
    if (!category) CategoryException.categoryNotFound();

    if (!isEmpty(category.products)) {
      CategoryException.categoryContainProducts();
    }

    await this.categoryRepo.remove(category);

    return {
      message: 'Delete category successfully',
      status: 200,
    };
  }

  async getAllProducts(page: number): Promise<ResProductDto[]> {
    const [results, total] = await this.productRepo.findAndCount({
      order: { name: 'DESC' },
      take: Number.parseInt(process.env.NUMBER_PRODUCT_PER_PAGE),
      skip: page,
      relations: ['category', 'user'],
    });

    const resProduct: ResProductDto[] = [];
    results.forEach((result) => {
      resProduct.push(new ResProductDto(result));
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
    const product: ProductEntity = await this.findProductById(productId);
    return new ResProductDto(product);
  }
  async updateProduct(
    productProps: ReqUpdateProduct,
    productId: string,
  ): Promise<ResProductDto> {
    const oldProduct: ProductEntity | null = await this.findProductById(
      productId,
    );

    if (oldProduct.user.id !== productProps.userId) UserException.permission();
    if (!oldProduct) ProductException.productNotFound();

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
