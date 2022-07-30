ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

ADD package.json /

RUN apk add --no-cache \
    nodejs \
    npm && npm install

COPY index.js /
COPY webroot /webroot
CMD ["npm", "start"]