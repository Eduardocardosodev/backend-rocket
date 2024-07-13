FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/dist /app

RUN npm install --only=production

EXPOSE 3001

CMD ["npm", "start"]
