# ReactJS
FROM node:alpine AS build
WORKDIR /usr/app/src
COPY . .
RUN yarn
RUN yarn build
ENTRYPOINT ["yarn", "start"]