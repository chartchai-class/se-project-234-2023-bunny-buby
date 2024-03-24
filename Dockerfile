FROM node:18

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . ./

EXPOSE 8010

CMD ["node", "app.js"]