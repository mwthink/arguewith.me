FROM node:12-alpine
WORKDIR /usr/app
COPY yarn.lock package.json ./
RUN yarn install
COPY . .
RUN npx tsc && rm -rf src tsconfig.json && yarn install --production

ENTRYPOINT ["/usr/local/bin/node","/usr/app/dist"]
