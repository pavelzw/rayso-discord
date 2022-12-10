FROM alpine

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn \
      npm

WORKDIR /app
COPY src /app/src
COPY config.yml /app/config.yml
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
ENTRYPOINT [ "node" "--enable-source-maps" "dist/index.mjs" ]