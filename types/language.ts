export type Language = {
  id: string;
  code: string;
  name: string;
  nativeName: string;
  locale: string;
  flagEmoji: string;
  isRTL: boolean;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
