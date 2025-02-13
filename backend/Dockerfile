FROM node:latest

WORKDIR /usr/src/app/

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 8080
RUN chmod +x ./scripts/run.sh 
RUN chmod +x ./scripts/wait-for-it.sh 

RUN ./scripts/run.sh

# RUN npm run build
# CMD ["npm", "start"]
