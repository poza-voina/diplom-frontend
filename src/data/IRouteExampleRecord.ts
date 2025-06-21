import {IRouteExample} from './IRouteExample';
import {IBaseRoute} from './route/IBaseRoute';

export interface IRouteExampleRecord {
  id: number;
  clientId: number,
  routeExampleId: number
  status: string
}

export interface IBookRouteExampleRecord extends IRouteExampleRecord {
  routeExample: IBookRouteExample
}

export interface IBookRouteExample extends IRouteExample {
  route: IBaseRoute;
}

interface Client {
  email: string,
  firstName: string,
  secondName: string,
  patronymic?: string,
  phoneNumber: string,
}

export interface IRouteExampleRecordWithClient extends IRouteExampleRecord {
  client: Client
}
