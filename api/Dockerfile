FROM node

WORKDIR /home/node/app

COPY package.json .
COPY package-lock.json .

RUN npm ci
COPY . .

RUN ["npm", "run", "dev"]
