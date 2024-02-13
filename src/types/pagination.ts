export enum Order {
  asc = 'ASC',
  desc = 'DESC',
}

export interface PaginationOptions {
  page: number;
  limit: number;
  orderBy: string;
  order: Order;
}
