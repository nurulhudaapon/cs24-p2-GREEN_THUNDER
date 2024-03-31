FROM node:20-alpine3.16
WORKDIR /app
COPY . .
RUN npm ci
RUN npm i -g bun
RUN npm run reset -w @ecosync/db
RUN npm run build -w @ecosync/web
EXPOSE 3000
CMD npm start -w @ecosync/web