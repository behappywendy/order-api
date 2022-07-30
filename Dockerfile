FROM mariadb
WORKDIR /home/order-api
RUN apt update
RUN apt install fish curl npm git -y
# RUN curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
# RUN omf install agnoster 
COPY . .
# RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
#   echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
#   apt update && \
#   apt install yarn -y && \
#   yarn install
# CMD ["knex", "migrate:up"]