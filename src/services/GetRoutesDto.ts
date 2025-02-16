import {RoutesSort} from "../components/routes/routesSort";

class RoutesFilter {
}

export class GetRoutesDto {
  pageNumber: number;
  countPerPage: number;
  sortType: RoutesSort;
  filters: RoutesFilter[] | null;

  constructor(dto : {pageNumber: number, countPerPage: number, sortType: RoutesSort, filters: RoutesFilter[] | null}) {
    this.pageNumber = dto.pageNumber;
    this.countPerPage = dto.countPerPage;
    this.sortType = dto.sortType;
    this.filters = dto.filters;
  }
}
