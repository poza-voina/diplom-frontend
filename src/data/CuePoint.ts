export interface IRouteCuePointItem {
  id: number | null;
  title: string | null;
  description: string | null;
  cuePointType: string | null;
  creationDateTime: string | null;
  routeId: number | null;
  sortIndex: number;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
}

export class RouteCuePointItem implements IRouteCuePointItem  {
    id: number | null;
    title: string | null;
    description: string | null;
    cuePointType: string | null;
    creationDateTime: string | null;
    routeId: number | null;
    sortIndex: number;
    latitude: number | null;
    longitude: number | null;
    address: string | null;

  constructor({
                id,
                title,
                description,
                cuePointType,
                creationDateTime,
                routeId,
                sortIndex,
                latitude,
                longitude,
                address
              }: {
    id: number | null,
    title: string | null,
    description: string | null,
    cuePointType: string | null,
    creationDateTime: string | null,
    routeId: number | null,
    sortIndex: number,
    latitude: number | null,
    longitude: number | null,
    address: string | null
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.cuePointType = cuePointType;
    this.creationDateTime = creationDateTime;
    this.routeId = routeId;
    this.sortIndex = sortIndex;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
  }

  static createEmpty() : RouteCuePointItem {
    return new  RouteCuePointItem({
      id: null,
      title: null,
      description: null,
      cuePointType: null,
      creationDateTime: null,
      routeId: null,
      sortIndex: -1,
      latitude: null,
      longitude: null,
      address: null,
    });
  }
}

