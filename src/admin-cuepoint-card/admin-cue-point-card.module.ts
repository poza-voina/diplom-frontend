import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminCuePointCardComponent} from './admin-cuepoint-card/admin-cue-point-card.component';
import {AdminCuePointCardHeaderComponent} from './admin-cue-point-card-header/admin-cue-point-card-header.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AdminCuePointCardComponent,
    AdminCuePointCardHeaderComponent
  ],
  exports: [
    AdminCuePointCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminCuePointCardModule { }
