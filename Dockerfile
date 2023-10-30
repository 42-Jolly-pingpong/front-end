FROM node:lts-alpine3.17

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=5173
ENV PORT $PORT

RUN npm i npm@latest -g

RUN npm i -g vite

WORKDIR /app

# USER node

COPY package.json package-lock.json* ./
RUN npm ci --include=dev && npm cache clean --force

ENV PATH /app/node_modules/.bin:$PATH

RUN ln -s /usr/local/lib/node_modules/ node_modules

HEALTHCHECK --interval=30s CMD node healthcheck.js

COPY . .

EXPOSE 5173

CMD [ "npm", "start", "--host" ]