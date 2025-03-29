import {IRouteCuePointItem} from "../data/CuePoint";
import {CuePointStatus} from '../enums/cue-point.status';
import {NavBarStatus} from '../enums/nav-bar.status';

export interface ICuePointCard {
  cuePointItem: IRouteCuePointItem | undefined;
  isHovered: boolean;
  sortIndex: number;
}

export class CuePointCard implements ICuePointCard {
  cuePointItem: IRouteCuePointItem;
  isHovered: boolean = false;
  sortIndex: number;

  constructor({isHovered, sortIndex, CuePointCard}: {
    isHovered: boolean,
    sortIndex: number,
    CuePointCard: IRouteCuePointItem
  }) {
    this.cuePointItem = CuePointCard;
    this.isHovered = isHovered;
    this.sortIndex = sortIndex;
  }
}
