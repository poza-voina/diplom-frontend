export interface IUserProfileDto {
  email: string;
  firstName: string;
  secondName: string;
  patronymic?: string;
  phoneNumber: string;
  registrationDateTime: string;
  isEmailConfirmed: boolean;
}
