FROM node:16.15-alpine as build
WORKDIR /src
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
WORKDIR /app
COPY --from=build /src/dist .
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80