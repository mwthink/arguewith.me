FROM node:12-alpine
WORKDIR /usr/app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
RUN npm run build:server && npm run build:client && rm -rf src tsconfig.json && yarn install --production

ENTRYPOINT ["/usr/local/bin/node","/usr/app/dist/server"]
