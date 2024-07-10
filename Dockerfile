# base image
FROM node:10

# set working directory
WORKDIR /usr/src/app

COPY package*.json ./
# COPY package.json ./
# COPY package-lock.json ./

# concat multiple run instructions
# sort them alphabetically
#RUN npm install \
#    npm audit fix

RUN yarn install --verbose

COPY . .
# ADD . .
EXPOSE 3000

CMD ["yarn", "start"]