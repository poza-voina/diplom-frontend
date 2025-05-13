import {ICategory} from '../../dto/ICategory';
import {IAttachment} from '../IAttachment';

export interface IBaseRoute {
  id: number;
  title: string;
  description: string | null;
  maxCountPeople: number | null;
  minCountPeople: number | null;
  baseCost: number | null;
  creationDateTime: string;
  isHidden: boolean;
  routeCategories: ICategory[];
}

export interface IRouteWithAttachment extends IBaseRoute {
  attachment: IAttachment;
}
