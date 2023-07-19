export class ReqAddProductToCartDto {
  productId!: string;
  quantity?: number = 1;
  userId?: string;
}
