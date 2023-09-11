import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductException, UserException } from '../exception';
import { UsersEntity } from '../user/entity';
import { ReqAddProduct, ReqUpdateProduct, ResProductDto } from './dto';
import { ElectronicsEntity, InventoryEntity } from './entity';
import { ProductEntity } from './entity/product.entity';
import { ProductType } from './type';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
    @InjectRepository(UsersEntity)
    private userRepo: Repository<UsersEntity>,
    @InjectRepository(InventoryEntity)
    private inventoryRepo: Repository<InventoryEntity>,
    @InjectRepository(ElectronicsEntity)
    private electronicRepo: Repository<ElectronicsEntity>,
  ) {}

  async addProduct(productInfo: ReqAddProduct) {
    const {
      description,
      imageUrl,
      name,
      price,
      userId,
      location,
      stock,
      type,
      brand,
      high,
      long,
      warranty,
      warranty_type,
      weight,
      wide,
    } = productInfo;

    // user owner product
    const user: UsersEntity = await this.userRepo.findOne({
      where: { id: userId },
    });
    if (!user) ProductException.ownerNotExist();

    // check product is existed
    const productFind: ProductEntity = await this.productRepo.findOne({
      where: { name },
    });
    if (productFind) ProductException.productExisted();

    // create information detail in specific category
    let category: ElectronicsEntity;
    switch (type) {
      case ProductType.ELECTRONIC: {
        const id = ElectronicsEntity.createElectronicId();

        const categoryCreated = this.electronicRepo.create({
          id,
          brand,
          high,
          long,
          wide,
          weight,
          warranty,
          warranty_type,
        });
        category = categoryCreated;
        await this.electronicRepo.save(category);
      }
    }

    // create inventory store base product
    const inventoryId = InventoryEntity.createInventoryId();
    const inventory: InventoryEntity = {
      id: inventoryId,
      location,
      stock,
      user,
    };
    await this.inventoryRepo.save(inventory);

    //create base products
    const productId: string = ProductEntity.createProductId();
    const product: ProductEntity = {
      id: productId,
      description,
      imageUrl,
      name,
      price,
      type,
      user: user,
      category,
      inventory,
    };
    await this.productRepo.save(product);

    // //create specific type information
    return new ResProductDto(product);
  }

  async getAllCategory() {
    const products = await this.productRepo
      .createQueryBuilder('products')
      .select('DISTINCT products.type', 'type')
      .getRawMany();

    const types = products.map((prod) => {
      return (prod = prod.type);
    });
    return types;
  }

  async getAllProducts(page: number): Promise<ResProductDto[]> {
    const [results, total] = await this.productRepo.findAndCount({
      order: { name: 'DESC' },
      take: Number.parseInt(process.env.NUMBER_PRODUCT_PER_PAGE),
      skip: (page - 1) * Number.parseInt(process.env.NUMBER_PRODUCT_PER_PAGE),
      relations: ['category', 'user', 'inventory'],
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
      relations: ['user', 'category', 'inventory'],
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
    if (!oldProduct) ProductException.productNotFound();
    if (oldProduct.user.id !== productProps.userId) UserException.permission();

    // base product
    oldProduct.name = productProps.name ?? oldProduct.name;
    oldProduct.description = productProps.description ?? oldProduct.description;
    oldProduct.imageUrl = productProps.imageUrl ?? oldProduct.imageUrl;
    oldProduct.price = productProps.price ?? oldProduct.price;
    oldProduct.type = productProps.type ?? oldProduct.type;

    // more information from categories
    oldProduct.category.brand = productProps.brand ?? oldProduct.category.brand;
    oldProduct.category.high = productProps.high ?? oldProduct.category.high;
    oldProduct.category.high = productProps.high ?? oldProduct.category.high;
    oldProduct.category.long = productProps.long ?? oldProduct.category.long;
    oldProduct.category.wide = productProps.wide ?? oldProduct.category.wide;
    oldProduct.category.warranty =
      productProps.warranty ?? oldProduct.category.warranty;
    oldProduct.category.warranty_type =
      productProps.warranty_type ?? oldProduct.category.warranty_type;
    oldProduct.category.weight =
      productProps.weight ?? oldProduct.category.weight;

    // inventory of products
    oldProduct.inventory.location =
      productProps.location ?? oldProduct.inventory.location;
    oldProduct.inventory.stock =
      productProps.stock ?? oldProduct.inventory.stock;

    this.productRepo.save(oldProduct);
    return new ResProductDto(oldProduct);
  }
}
