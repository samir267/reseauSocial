/* eslint-disable prettier/prettier */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface PaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }
  