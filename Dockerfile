# Build Client
FROM node:18-alpine AS client-builder

WORKDIR /client
COPY client/package*.json ./

RUN npm ci 

COPY client . 

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL="/api/"

RUN npm run build

# Build Server

FROM node:18-alpine AS server-builder

WORKDIR /server

RUN apk add --no-cache openssl 

COPY server/package*.json ./

RUN npm ci 

COPY server .

ENV HOSTNAME "0.0.0.0"

RUN cd infrastructure/prisma && npx prisma generate 

# Finalized Image

FROM node:18-alpine

RUN apk add --no-cache openssl

COPY --from=client-builder /client/dist /client/dist
COPY --from=server-builder /server /server

WORKDIR /server

EXPOSE 3000

CMD ["npm", "run", "dev"]

LABEL name="water-analytics-app"