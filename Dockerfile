FROM node:20

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . /app

EXPOSE 8010

CMD ["node", "app.js"]