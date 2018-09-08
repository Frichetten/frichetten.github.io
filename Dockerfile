FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

WORKDIR ./angular-frontend

RUN npm install
RUN npm -g install @angular/cli
RUN ng build --prod --aot --build-optimizer

WORKDIR /usr/src/app

CMD [ "npm", "start" ]
