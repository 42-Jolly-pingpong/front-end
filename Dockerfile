FROM node:lts-alpine3.17

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=5173
ENV PORT $PORT

RUN npm i npm@latest -g
RUN npm i -g vite

USER node

WORKDIR /app

COPY --chown=node:node package.json package-lock.json* ./
# RUN npm ci && npm cache clean --force
RUN npm install --silent
# ENV PATH /app/node_modules/.bin:$PATH
RUN ln -s /usr/local/lib/node_modules/ node_modules

HEALTHCHECK --interval=30s CMD node healthcheck.js

COPY --chown=node:node . .

CMD ["npm", "start"]