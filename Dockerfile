FROM node:17.4-alpine3.14

WORKDIR /expressgallery

COPY . /expressgallery


RUN npm install
CMD npm run dev
EXPOSE 3000