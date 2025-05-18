import {CuePointStatus} from '../enums/cue-point.status';
import {NavBarStatus} from '../enums/nav-bar.status';
import {IBaseRouteCuePoint} from '../data/cuePoint/CuePoint';

export interface ICuePointCard {
  file?: File;
  cuePointItem: IBaseRouteCuePoint;
  isHovered: boolean;
  status: CuePointStatus;
}

export class CuePointCard implements ICuePointCard {
  cuePointItem: IBaseRouteCuePoint;
  isHovered: boolean = false;
  status: CuePointStatus;

  constructor({isHovered, cuePointItem, cuePointStatus}: {
    isHovered: boolean,
    cuePointItem: IBaseRouteCuePoint,
    cuePointStatus: CuePointStatus
  }) {
    this.cuePointItem = cuePointItem;
    this.isHovered = isHovered;
    this.status = cuePointStatus;
  }


}
