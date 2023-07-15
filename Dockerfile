FROM node:16-alpine

WORKDIR /app

RUN apk update && apk add bash git mc

COPY package*.json ./

RUN npm i --legacy-peer-deps

COPY ENV.md .env

EXPOSE 3000
