# FROM node:current-alpine3.15
FROM node:14

WORKDIR /app

COPY package.json /app

RUN npm install
RUN npm install react-google-charts
RUN npm install react-chartjs-2
RUN npm install chart.js

COPY . /app

EXPOSE 3000

# CMD ["npm", "run", "dev"] 

# RUN npm run build

# CMD ["npm", "start"] 

