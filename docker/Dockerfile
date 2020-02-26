FROM node as build

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:ssr
RUN cp -r models dist/

#FROM gcr.io/distroless/nodejs

#COPY --from=build /usr/src/app /usr/src/app
RUN useradd -r -u 1337 webuser
USER webuser

EXPOSE 8080

CMD [ "npm", "run", "serve:ssr"]
