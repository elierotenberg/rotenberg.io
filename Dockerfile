FROM node:13.8.0-stretch AS client-build

WORKDIR /usr/src/app
COPY package*.json ./

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm ci || npm i

COPY src src
COPY public public

COPY *.ts ./
COPY tsconfig.json .

RUN npm run build
RUN npm run export

FROM nginx:1.17-alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/log/app_engine

RUN mkdir -p /usr/share/nginx/www/_ah && \
  echo "healthy" > /usr/share/nginx/www/_ah/health

COPY --from=client-build /usr/src/app/out /usr/share/nginx/www
RUN chmod -R a+r /usr/share/nginx/www
