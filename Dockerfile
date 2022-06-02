FROM node:16.15.0-alpine

WORKDIR /usr/app
COPY package.json .

RUN npm install

COPY src .

RUN npx tsc

CMD ["node", "out/src/index.js"]