import {RoutesFilter, RoutesSort} from '../components/modules/admin/admin-routes/routesSort';

export class GetRoutesWithFiltersDto {
  pageNumber: number;
  pageSize: number;
  sortType: RoutesSort | undefined;
  filters: RoutesFilter[] | null | undefined;
  title: string;

  constructor(dto: {
    pageNumber: number,
    pageSize: number,
    title: string,
    sortType?: RoutesSort,
    filters?: RoutesFilter[] | null
  }) {
    this.pageNumber = dto.pageNumber;
    this.pageSize = dto.pageSize;
    this.sortType = dto.sortType;
    this.filters = dto.filters;
    this.title = dto.title;
  }
}
