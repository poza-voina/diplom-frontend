import {Component, EventEmitter, Output} from '@angular/core';
import {NavBarStatus, NavBarStatusHelper} from '../../../../enums/nav-bar.status';


@Component({
  selector: 'app-admin-cue-point-card-header',
  templateUrl: './admin-cue-point-card-header.component.html',
  styleUrl: './admin-cue-point-card-header.component.css',
  standalone: false
})

export class AdminCuePointCardHeaderComponent {

  @Output() public onTabClick = new EventEmitter<NavBarStatus>();
  @Output() public onToggleExpand = new EventEmitter<boolean>();
  @Output() public onMoveLower = new EventEmitter();
  @Output() public onMoveHigher = new EventEmitter();

  navBarStatusHelper: NavBarStatusHelper = new NavBarStatusHelper();
  activeTabIndex: number = 0;
  isExpanded = false;

  handleTabClick(status: NavBarStatus, tabIndex: number): void {
    this.activeTabIndex = tabIndex;
    this.onTabClick.emit(status);
  }

  handleToggleExpand() {
    this.isExpanded = !this.isExpanded;
    this.onToggleExpand.emit(this.isExpanded);
  }
}
