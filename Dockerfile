FROM node:16-alpine
WORKDIR /usr/src/ra-api
ADD package.json ./
RUN yarn
ADD . .
RUN yarn build
CMD ["node", "./dist/main.js"]
