import { IsOptional, IsString } from 'class-validator';

export class ReqAddCategory {
  @IsString()
  @IsOptional({ always: false })
  categoryId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
