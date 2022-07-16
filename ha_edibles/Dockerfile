ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ADD package.json /

RUN apk add --no-cache \
    nodejs \
    nodejs-npm && npm install

COPY index.js /
CMD ["npm", "start"]