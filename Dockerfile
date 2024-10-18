FROM node:alpine
ARG SETTINGS

ENV MICROSERVICE=/home/app/microservice
ENV SETTINGS=${SETTINGS}

RUN mkdir -p ${MICROSERVICE}

WORKDIR ${MICROSERVICE}

EXPOSE 8080

COPY package.json ./

RUN ls
RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]