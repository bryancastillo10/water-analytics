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

RUN cd infrastructure/prisma && npx prisma generate 

RUN npm run build

# Finalized Image

FROM node:18-alpine

RUN apk add --no-cache openssl

COPY --from=client-builder /client/dist /client/dist
COPY --from=server-builder /server/node_modules /server/node_modules
COPY --from=server-builder /server/package.json /server/package.json
COPY --from=server-builder /server/dist /server/dist

WORKDIR /server

EXPOSE 3000

CMD ["node", "dist/index.cjs"]

LABEL name="water-analytics-app"