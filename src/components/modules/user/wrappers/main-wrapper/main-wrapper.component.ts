import { Component } from '@angular/core';
import {NavigationBarComponent} from '../../components/navigation-bar/navigation-bar.component';
import {NgIf} from '@angular/common';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-wrapper',
  imports: [
    NavigationBarComponent,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './main-wrapper.component.html',
  styleUrl: './main-wrapper.component.css'
})
export class MainWrapperComponent {

}
