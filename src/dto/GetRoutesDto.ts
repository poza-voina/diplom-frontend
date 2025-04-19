import {RoutesFilter, RoutesSort} from '../components/modules/admin/admin-routes/routesSort';

export class GetRoutesDto {
  pageNumber: number;
  countPerPage: number;
  sortType: RoutesSort | undefined;
  filters: RoutesFilter[] | null | undefined;

  constructor(dto: {
    pageNumber: number,
    countPerPage: number,
    sortType?: RoutesSort,
    filters?: RoutesFilter[] | null
  }) {
    this.pageNumber = dto.pageNumber;
    this.countPerPage = dto.countPerPage;
    this.sortType = dto.sortType;
    this.filters = dto.filters;
  }
}
