import { ResUserDto } from 'src/user/dto';
import { ProductEntity } from '../entity/product.entity';
import { ElectronicsEntity, InventoryEntity } from '../entity';

export class ResProductDto {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  user: ResUserDto;
  inventory: InventoryEntity;
  category: ElectronicsEntity;

  constructor(product: ProductEntity) {
    Object.assign(this, {
      id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      user: new ResUserDto(product.user),
      type: product.type,
      inventory: product.inventory,
      category: product.category,
    });
  }
}
