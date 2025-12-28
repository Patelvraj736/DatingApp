 export type Pagination = {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
 }
 export type PaginatedResult<T> = {
    items: T[];
    metadata: Pagination;
 }

 export class MemberParams{
   gender? : string;
   minAge = 18;
   maxAge = 99;
   pageNumber = 1;
   pageSize = 10;
   orderBy = 'lastActive';
   
 }