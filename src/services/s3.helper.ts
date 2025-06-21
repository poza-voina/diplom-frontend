import {environment} from '../env';

export class S3Helper {
  static getImageUrlOrDefault (imageUri?: string) : string | null {
    if (!imageUri) {
      return null;
    }

    return environment.s3Url + imageUri;
  }
}
