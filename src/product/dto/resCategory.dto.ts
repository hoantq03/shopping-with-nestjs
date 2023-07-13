import { CategoryEntity } from '../entity/categories.entity';

export class ResCategoryDto {
  categoryId: string;
  name: string;
  description: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;

  constructor(Category: CategoryEntity) {
    Object.assign(this, {
      categoryId: Category.categoryId,
      name: Category.name,
      description: Category.description,
      createdAt: Category.createdAt,
      createdBy: Category.createdBy,
      updatedAt: Category.updatedAt,
      updatedBy: Category.updatedBy,
    });
  }
}
