FROM node:lts
RUN git clone https://github.com/dino70416/order-api.git
WORKDIR /order-api
RUN yarn install && \
  yarn add knex -g
EXPOSE 3001
CMD [ "sh", "-c", "yarn run dev" ]