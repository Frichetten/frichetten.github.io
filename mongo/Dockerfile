from mongo

WORKDIR /usr/src/app

COPY . .

#RUN mongod
#RUN mongorestore --db personal ./personal
EXPOSE 27017

CMD [ "mongod", "--bind_ip", "0.0.0.0" ]
