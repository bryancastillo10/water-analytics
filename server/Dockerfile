FROM node:18-alpine 
WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci

COPY . .

RUN cd infrastructure/prisma && npx prisma generate

CMD ["npm", "run", "dev"]
