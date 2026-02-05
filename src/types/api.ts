export type ApiListResponse<T> = {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    lastPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

export type ApiItemResponse<T> = {
  data: T;
};