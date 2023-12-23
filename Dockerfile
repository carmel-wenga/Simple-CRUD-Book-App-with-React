FROM node:alpine

WORKDIR /library

COPY ./package.json yarn.lock /library/

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]