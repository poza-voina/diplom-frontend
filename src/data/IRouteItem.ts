import {RouteCategoryItem} from './RouteCategoryItem';
import {ICategoryItem} from '../dto/ICategoryItem';

export interface IRouteItem {
  id: number;
  title: string;
  description: string | null;
  maxCountPeople: number | null;
  minCountPeople: number | null;
  baseCost: number | null;
  creationDateTime: string;
  isHidden: boolean;
  routeCategories: ICategoryItem[];
}
