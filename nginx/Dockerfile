FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
