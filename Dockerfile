# ReactJS
FROM node:alpine AS build
WORKDIR /usr/app/src
COPY . .
RUN yarn
RUN yarn build
EXPOSE 3000
ENTRYPOINT ["yarn", "start"]