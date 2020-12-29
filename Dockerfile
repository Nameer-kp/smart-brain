FROM node:10 AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run-script build

# nginx state for serving

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
