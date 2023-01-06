# ReactJS
FROM node AS build
WORKDIR /usr/app/src
COPY . .
RUN yarn
RUN yarn build
ENTRYPOINT ["yarn", "start"]