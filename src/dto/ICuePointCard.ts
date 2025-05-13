import {CuePointStatus} from '../enums/cue-point.status';
import {NavBarStatus} from '../enums/nav-bar.status';
import {IBaseRouteCuePoint} from '../data/cuePoint/CuePoint';

export interface ICuePointCard {
  cuePointItem: IBaseRouteCuePoint | undefined;
  isHovered: boolean;
  sortIndex: number;
  status: CuePointStatus;
}

export class CuePointCard implements ICuePointCard {
  cuePointItem: IBaseRouteCuePoint;
  isHovered: boolean = false;
  sortIndex: number;
  status: CuePointStatus;

  constructor({isHovered, sortIndex, cuePointCard, cuePointStatus}: {
    isHovered: boolean,
    sortIndex: number,
    cuePointCard: IBaseRouteCuePoint,
    cuePointStatus: CuePointStatus
  }) {
    this.cuePointItem = cuePointCard;
    this.isHovered = isHovered;
    this.sortIndex = sortIndex;
    this.status = cuePointStatus;
  }


}
