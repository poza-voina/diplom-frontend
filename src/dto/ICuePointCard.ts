import {CuePointStatus} from '../enums/cue-point.status';
import {NavBarStatus} from '../enums/nav-bar.status';
import {IBaseRouteCuePoint} from '../data/cuePoint/CuePoint';

export interface ICuePointCard {
  cuePointItem: IBaseRouteCuePoint | undefined;
  isHovered: boolean;
  sortIndex: number;
}

export class CuePointCard implements ICuePointCard {
  cuePointItem: IBaseRouteCuePoint;
  isHovered: boolean = false;
  sortIndex: number;

  constructor({isHovered, sortIndex, CuePointCard}: {
    isHovered: boolean,
    sortIndex: number,
    CuePointCard: IBaseRouteCuePoint
  }) {
    this.cuePointItem = CuePointCard;
    this.isHovered = isHovered;
    this.sortIndex = sortIndex;
  }
}
