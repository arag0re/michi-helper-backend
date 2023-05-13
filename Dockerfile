FROM node:lts-bullseye-slim
LABEL MAINTAINER="Anton Stadie <anton.stadie@icontec.de>"
ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir /opt/michi-helper && mkdir /opt/michi-helper/backend
COPY ./ /opt/michi-helper/backend/
WORKDIR /opt/michi-helper/backend
RUN rm -rf node_modules package-lock.json && npm i --save
RUN chown -R node:node node_modules
EXPOSE 3001
ENTRYPOINT [ "npm", "start" ]