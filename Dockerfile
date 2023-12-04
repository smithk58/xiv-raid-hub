# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Build raid hub dependencies, the koa server depends on its dependencies in prod so we separate them to keep the image size smaller
COPY package*.json ./
COPY src/server/package*.json src/server/
RUN npm ci

# Build raid hub dist
COPY . .
RUN npm run build

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/src/server/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD [ "npm", "start" ]
