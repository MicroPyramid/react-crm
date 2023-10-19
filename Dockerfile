FROM ubuntu:20.04

ARG APP_NAME

# test arg
RUN test -n "$APP_NAME"

# install system packages
RUN apt-get update -y
RUN apt-get install -y \
  vim \
  wget \
  curl \
  net-tools \
  xz-utils

# install node
WORKDIR /opt
RUN wget https://nodejs.org/dist/v14.19.1/node-v14.19.1-linux-x64.tar.xz
RUN tar -xvf node-v14.19.1-linux-x64.tar.xz
ENV PATH="${PATH}:/opt/node-v14.19.1-linux-x64/bin"
# RUN ln -s /opt/node-v14.19.1-linux-x64/bin/node /usr/bin/
# RUn ln -s /opt/node-v14.19.1-linux-x64/bin/npm /usr/bin/

# setup user
RUN useradd -ms /bin/bash ubuntu
USER ubuntu

# install app
RUN mkdir -p /home/ubuntu/"$APP_NAME"/"$APP_NAME"
WORKDIR /home/ubuntu/"$APP_NAME"/"$APP_NAME"
COPY . .
RUN echo $PATH
RUN npm install

CMD ["npm", "start"]
