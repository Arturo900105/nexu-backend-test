FROM node:18

RUN npm i -g nodemon
RUN npm i -g knex
RUN mkdir -p /home/app

WORKDIR /home/app

EXPOSE ${HOST_PORT}

CMD ["npm", "run", "prod"]