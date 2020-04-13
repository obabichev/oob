FROM node:12.2.0-alpine as build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY public public
COPY src src

RUN npm run build


FROM nginx:1.17.9

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/nginx.conf.template

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'


