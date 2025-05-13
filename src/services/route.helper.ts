export class RouteHelper {
  public static ConvertRouteExampleRecordStatusToMessage(status: string): string {
    switch (status) {
      case 'Approved':
        return 'Одобрен';
      case 'Reject':
        return 'Отклонен';
      case 'Pending':
        return 'Ожидает';
      default:
        throw new Error(`Не известный статус ${status}`);
    }
  }
}
