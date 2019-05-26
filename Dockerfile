FROM node:latest

RUN curl -o- -L https://yarnpkg.com/install.sh | \  bash -s -- --version 0.26.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . ./
EXPOSE 3000
CMD [ “npm”, “start” ]
