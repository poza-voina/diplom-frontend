export interface RouteItem {
  id: number;
  title: string;
  description: string | null;
  maxCountPeople: number | null;
  minCountPeople: number | null;
  baseCost: number | null;
  creationDateTime: string;
  isHidden: boolean;
}
