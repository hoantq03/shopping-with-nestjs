import { UsersEntity } from 'src/user/entity';
import { CategoryEntity } from '../entity/categories.entity';
import { ProductEntity } from '../entity/product.entity';

export class ResProduct {
  id: string;
  name: string;
  description: string;
  color: string;
  discount: number;
  imageUrl: string;
  price: number;
  quantityInStock: number;
  category: CategoryEntity;
  user: UsersEntity;

  constructor(product: ProductEntity) {
    Object.assign(this, {
      id: product.id,
      name: product.name,
      description: product.description,
      color: product.color,
      discount: product.discount,
      imageUrl: product.imageUrl,
      price: product.price,
      quantityInStock: product.quantityInStock,
      category: product.category,
      user: product.user,
    });
  }
}
