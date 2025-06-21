export const environment = {
  type: 'development',
  apiUrl: process.env['API_URL'] || 'http://localhost:51343/api',
  yandexMapsApiKey: process.env['YANDEX_MAPS_API_KEY'] || '268c38ba-239f-4d68-b429-57fcd29522bb',
  s3Url: process.env['S3_URL'] || 'http://localhost:9000',
}

console.log("environment");
console.log(environment);
