# Stage 1: build Angular app
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Копируем собранный билд из первой стадии в папку nginx для отдачи статики
COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html

# Копируем кастомный конфиг nginx для SPA роутинга
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
