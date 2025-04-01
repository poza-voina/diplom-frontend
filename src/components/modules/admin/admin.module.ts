import {NgModule} from '@angular/core';
import {AdminCuePointCardComponent} from './admin-cuepoint-card/admin-cue-point-card.component';
import {AdminCuePointCardHeaderComponent} from './admin-cue-point-card-header/admin-cue-point-card-header.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {AdminMainHeaderComponent} from './admin-main-header/admin-main-header.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AdminCuePointCardComponent,
    AdminCuePointCardHeaderComponent,
    AdminMainHeaderComponent
  ],
  exports: [
    AdminCuePointCardComponent,
    AdminMainHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbComponent,
  ]
})
export class AdminModule { }
