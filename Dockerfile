FROM node:lts-bookworm-slim

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# If you are building your code for production
RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]

HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1 