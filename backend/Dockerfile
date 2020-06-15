FROM node:10

WORKDIR /journalBackend

COPY package.json /journalBackend

RUN npm install

COPY . /journalBackend

CMD ["node", "server.js"]