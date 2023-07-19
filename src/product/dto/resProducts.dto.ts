import { ResUserDto } from 'src/user/dto';
import { ProductEntity } from '../entity/product.entity';
import { ResCategoryDto } from './resCategory.dto';

export class ResProductDto {
  id: string;
  name: string;
  description: string;
  color: string;
  discount: number;
  imageUrl: string;
  price: number;
  stock: number;
  category: ResCategoryDto;
  user: ResUserDto;

  constructor(product: ProductEntity) {
    Object.assign(this, {
      id: product.id,
      name: product.name,
      description: product.description,
      color: product.color,
      discount: product.discount,
      imageUrl: product.imageUrl,
      price: product.price,
      stock: product.stock,
      category: new ResCategoryDto(product.category),
      user: new ResUserDto(product.user),
    });
  }
}
