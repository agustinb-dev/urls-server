FROM node:19.5-alpine as urls-server
LABEL author="Agustin Barcia"

WORKDIR /app

ENV NODE_ENV=docker

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev" ]