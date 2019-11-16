FROM node

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:ssr
RUN cp -r models dist/

RUN useradd -r -u 100 webuser
USER webuser

EXPOSE 8080

CMD [ "npm", "run", "serve:ssr"]
