FROM node:carbon

EXPOSE 8080

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y \
    build-essential \
    curl \
    sudo \
    wget

ENV APP_HOME=/usr/local/nonroot
ENV APP_LOG=/var/log/app/app.log
ENV APP_ERR=/var/log/app/app.err

# Create a nonroot user and add it as sudo user
RUN /usr/sbin/useradd --create-home --home-dir $APP_HOME --shell /bin/bash nonroot
RUN /usr/sbin/adduser nonroot sudo
RUN echo "nonroot ALL=NOPASSWD: ALL" >> /etc/sudoes

# Install global node packages
RUN npm install -g \
    bower \
    karma-cli \
    nodemon \
    gulp-cli \
    bower-npm-resolver \
    pm2 \
    node-sass

# Change permission for folders
RUN mkdir -p /var/log/app && chmod a+w /var/log/app

# Install local node packages
ADD package.json /usr/local/lib/app/package.json

# ClearCache is a variable that would be changed upon each build to make sure docker cache is cleared
# All the commands below this line would be rebuilt each docker build (no caching)
RUN echo "ClearCache" && cd /usr/local/lib/app && npm install
RUN chown -R nonroot /usr/local/lib/app/node_modules

# Create directories for generated css and js (dist) and for bower components (vendor)
RUN mkdir /usr/local/lib/app/vendor && chown -R nonroot /usr/local/lib/app/vendor
RUN mkdir /usr/local/lib/app/dist && chown -R nonroot /usr/local/lib/app/dist

# Copy source over
COPY ./ $APP_HOME/app
RUN chown -R nonroot $APP_HOME/app

WORKDIR $APP_HOME/app
USER nonroot
RUN bower install && gulp sass && gulp compress
CMD npm start