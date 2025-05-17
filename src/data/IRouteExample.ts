import {IBaseRoute} from './route/IBaseRoute';

export interface IRouteExample {
  id: number;
  routeId: number;
  creationDateTime: string;
  startDateTime: string;
  endDateTime: string;
  countRecords: number;
  status: string;
}

export interface IRouteExampleWithRoute extends IRouteExample {
  route: IBaseRoute;
}

export interface IGetPendingRoutesExamplesRequest {
  isUserPending: boolean;
  isRouteExamplePending: boolean;
  pageNumber: number;
  pageSize: number;
}
