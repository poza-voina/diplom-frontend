import {Component, OnInit} from '@angular/core';
import {ClientActionsService} from '../../../../../services/client-actions.service';
import {ClientService} from '../../../../../services/client.service';
import {IUserProfileDto} from '../../../../../dto/IUserProfileDto';
import {IBookRouteExampleRecord, IRouteExampleRecord} from '../../../../../data/IRouteExampleRecord';
import {IGetBooksRequestWithPaginate} from '../../../../../data/book/IGetBooksRequestWithPaginate';
import {DatePipe, NgForOf} from '@angular/common';
import {RouteService} from '../../../../../services/route.service';
import {RouteHelper} from '../../../../../services/route.helper';
import {IBaseRoute} from '../../../../../data/route/IBaseRoute';
import {Router} from '@angular/router';
import {ClientAuthService} from '../../service/client-auth.service';

@Component({
  selector: 'app-profile-page',
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  profileView: IUserProfileDto | null = null;
  routeExampleRecordsView: IBookRouteExampleRecord[] | null = null;
  routes: IBaseRoute[] | null = null;
  currentPageNumber: number = 1;
  currentPageSize: number = 10;
  loadingErrors: LoadingErrors<ProfilePageComponent> = new LoadingErrors<ProfilePageComponent>();

  constructor(
    private clientService: ClientService,
    private clientAuthService: ClientAuthService,
    private clientActionsService: ClientActionsService,
    private routeService: RouteService,
    private router: Router) {
  }

  ngOnInit(): void {
    if(!this.clientAuthService.isAuthenticated()){
      this.router.navigate(['/login']);
      return;
    }
    this.clientService.getProfile().subscribe(
      {
        next: value => this.profileView = value,
        error: error => {
          this.loadingErrors.push('profileView');
          console.log("Не удалось загрузить профиль", error)
        }
      }
    )

    let getBooksRequest: IGetBooksRequestWithPaginate = {pageNumber: this.currentPageNumber, pageSize: this.currentPageSize};
    this.clientActionsService.getBooks(getBooksRequest).subscribe(
      {
        next: value => {
          this.routeExampleRecordsView = value
        },
        error: error => {
          this.loadingErrors.push('routeExampleRecordsView');
          console.log("Не удалось загрузить профиль записи", error)
        }
      }
    )

  }

  getRecordStatus(status: string) :string {
    return RouteHelper.ConvertRouteExampleRecordStatusToMessage(status);
  }

  goToEditProfile() {
    this.router.navigate(['/profile/edit']);
  }
}

export class LoadingError<T> {
  property: keyof T;

  constructor(property: keyof T) {
    this.property = property;
  }
}


export class LoadingErrors<T> {
  errors: LoadingError<T>[] = [];

  push(property: keyof T): void {
    this.errors.push(new LoadingError<T>(property));
  }

  isError(property: keyof T): boolean {
    return this.errors.some(error => error.property === property);
  }
}

