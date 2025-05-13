export enum NavBarStatus {
  Info = 'Info',
  Address = 'Address',
  Image = 'Image',
}


export class NavBarStatusHelper {

  public constructor() {}

  getValues(): string[] {
    return Object.values(NavBarStatus);
  }

  getKeys(): NavBarStatus[] {
    return Object.keys(NavBarStatus) as NavBarStatus[];
  }

  getDescriptions(): string[] {
    return this.getKeys().map(x => this.getDescription(x));
  }

  getDescriptionsByKeys(sort: NavBarStatus[]) {
    return sort.map(x => this.getDescription(x));
  }

  getDescription(sort: NavBarStatus): string {
    switch (sort) {
      case NavBarStatus.Info:
        return "Общаяя информация"
      case NavBarStatus.Address:
        return 'Адрес';
        case NavBarStatus.Image:
          return 'Изображение';
    }
  }

  fromString(value: string): NavBarStatus | undefined {
    return NavBarStatus[value as keyof typeof NavBarStatus];
  }
}
