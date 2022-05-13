FROM alpine:latest

# Install basic dependencies.
RUN apk update && apk upgrade
RUN apk add --no-cache nginx npm

# Get project files.
COPY ./*.json /front/
COPY ./karma.conf.js /front/
COPY ./src/ /front/src/

# Build angular website.
RUN cd /front && npm install
RUN cd /front && npx ng build && mv /front/dist/sibarita-front /usr/share/nginx/html

# Add docker(nginx) configurations.
COPY ./docker/ /

# Clean image.
RUN cd /
RUN rm -fr /front

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
