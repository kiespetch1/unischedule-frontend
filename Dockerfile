FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/dist ./dist

COPY package*.json ./

RUN npm install --only=production

EXPOSE 3000

RUN npm install -g serve

CMD ["serve", "-s", "dist", "-l", "3000"]
