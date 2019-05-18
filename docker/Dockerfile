FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install
RUN npm install @angular/cli

COPY . .

RUN npm run build:ssr

EXPOSE 8080

CMD [ "npm", "run", "serve:ssr"]