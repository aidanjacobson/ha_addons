ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apk add --no-cache \
    nodejs \
    npm \
    git

COPY package.json /
COPY index.js /
RUN cd / && npm install --unsafe-perm
CMD ["npm", "start"]