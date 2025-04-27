export class AuthTokenNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthTokenNotFoundError';  // Название ошибки
  }
}
