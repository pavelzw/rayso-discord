FROM node:19-alpine
# the ray.so javascript library needs chromium to work
RUN apk add --no-cache chromium --repository=http://dl-cdn.alpinelinux.org/alpine/v3.10/main

WORKDIR /app
COPY src /app/src
COPY config.yml /app/config.yml
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

ENTRYPOINT [ "node", "." ]
