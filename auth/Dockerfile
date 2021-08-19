FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn install
RUN yarn cache clean

COPY . .

CMD ["yarn", "dev"]
