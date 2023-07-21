FROM node:alpine
WORKDIR /src/app
COPY package*.json .
RUN npm ci --force
COPY . .

EXPOSE 3001

CMD npm start