FROM node:latest

WORKDIR /usr/src/app/

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 8080

RUN npm run build
CMD ["npm", "start"]
