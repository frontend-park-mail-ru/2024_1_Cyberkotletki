FROM node:18-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm run build

COPY robots.txt ./dist/
COPY sitemap.xml ./dist/
COPY manifest.json ./dist/

EXPOSE 8000
