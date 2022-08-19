export interface PaginationArgs {
  limit?: number;
  offset?: number;
}

export type WithoutId<T> = Omit<T, "id">;
