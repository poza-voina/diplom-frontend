import {S3_BASE_URL} from '../api-routes.config';

export class S3Helper {
  static getImageUrlOrDefault (imageUri?: string) : string | null {
    if (!imageUri) {
      return null;
    }

    return S3_BASE_URL + imageUri;
  }
}
