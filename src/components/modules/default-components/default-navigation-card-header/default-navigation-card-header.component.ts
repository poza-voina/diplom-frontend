import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IHeaderNavigationItem} from '../data/IHeaderNavigationItem';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-default-navigation-card-header',
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './default-navigation-card-header.component.html',
  styleUrl: './default-navigation-card-header.component.css'
})

export class DefaultNavigationCardHeaderComponent implements OnInit {
  @Input()
  navigationItems: IHeaderNavigationItem<string | number>[] = [];
  @Input()
  activeTabIndex: number = 0;
  @Output() public onTabClick = new EventEmitter<IHeaderNavigationItem<string | number>>();
  @Output() public onInitialized = new EventEmitter<IHeaderNavigationItem<string | number>>();

  ngOnInit(): void {
    this.onInitialized.emit(this.navigationItems[this.activeTabIndex]);
  }

  handleTabClick(navigationItem: IHeaderNavigationItem<string | number>, tabIndex: number): void {
    this.activeTabIndex = tabIndex;
    this.onTabClick.emit(navigationItem);
  }
}
