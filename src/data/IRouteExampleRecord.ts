import {IRouteExample} from './IRouteExample';
import {IBaseRoute} from './route/IBaseRoute';

export interface IRouteExampleRecord {
  clientId: number,
  routeExampleId: number
  status: string
}

export interface IBookRouteExampleRecord extends IRouteExampleRecord {
  routeExample : IBookRouteExample
}

export interface IBookRouteExample extends IRouteExample {
  route: IBaseRoute;
}
