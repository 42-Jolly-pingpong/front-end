FROM node:lts-alpine3.17

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=5173
ENV PORT $PORT

RUN npm i npm@latest -g

RUN npm i -g vite

USER node

WORKDIR /app

COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci --include=dev && npm cache clean --force

HEALTHCHECK --interval=30s CMD node healthcheck.js

COPY --chown=node:node . .

EXPOSE $PORT

CMD [ "npm", "run", "dev"]