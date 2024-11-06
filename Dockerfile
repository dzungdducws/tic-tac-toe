FROM node:20
WORKDIR /tic-tac-toe
COPY package.json .
RUN npm install
COPY . .
RUN npm start
EXPOSE 3000
CMD ["npm", "start"]
