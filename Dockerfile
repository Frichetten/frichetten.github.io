FROM alpine AS hugo-compile

COPY . .

ADD https://github.com/gohugoio/hugo/releases/download/v0.67.1/hugo_0.67.1_Linux-64bit.tar.gz /tmp
RUN tar -xf /tmp/hugo_0.67.1_Linux-64bit.tar.gz -C /tmp \
    && mkdir -p /usr/local/sbin \
    && mv /tmp/hugo /usr/local/sbin/hugo \
    && rm -rf /tmp/hugo_0.67.1_Linux-64bit.tar.gz \
    && rm -rf /tmp/LICENSE \
    && rm -rf /tmp/README.md

ARG baseURL

RUN hugo --baseURL $baseURL

FROM nginx:alpine

COPY --from=hugo-compile public/ /usr/share/nginx/html/
COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/nginx/frichetten.com /etc/nginx/sites-enabled/frichetten.com

EXPOSE 80

CMD ["nginx","-g","daemon off;","-c","/etc/nginx/nginx.conf"]
