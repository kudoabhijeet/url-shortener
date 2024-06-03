FROM node:latest

WORKDIR /usr/src/app/

COPY package*.json ./
RUN npm i

COPY . .

EXPOSE 8080
RUN chmod +x run.sh 
RUN chmod +x wait-for-it.sh 

RUN ./scripts/run.sh

# RUN npm run build
# CMD ["npm", "start"]
