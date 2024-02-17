FROM node:alpine

COPY . /backend/
COPY package.json /backend/

EXPOSE 3001:3001

WORKDIR /backend
RUN npm install
CMD ["node", "main.js"]