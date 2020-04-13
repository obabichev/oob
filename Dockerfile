FROM node:12.2.0-alpine as build

WORKDIR /app

COPY client/package.json client/package-lock.json client/tsconfig.json ./

RUN npm install

COPY client/public public
COPY client/src src

RUN npm run build


#FROM nginx:1.17.9

#RUN rm -rf /usr/share/nginx/html/*

#COPY --from=build /app/build /usr/share/nginx/html
#COPY nginx.conf.template /etc/nginx/nginx.conf.template
#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'

FROM python:3.8.1-slim-buster

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

RUN pip install --upgrade pip
COPY ./server/requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

COPY ./server /usr/src/app/
COPY --from=build /app/build /usr/src/app/static
