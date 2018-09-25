FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install --prod
RUN npm install @angular/cli

COPY . .

RUN npm run build:prod:ssr

EXPOSE 8080

CMD [ "npm", "run", "serve:ssr"]