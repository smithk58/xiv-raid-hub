# Build stage
FROM node:14-alpine as build

WORKDIR /app

# Build raid hub dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Build raid hub dist
COPY . .
RUN npm run build

# Build raid hub server dependencies separately (the koa server depends on its node modules, so we build them separately
# from the rest of the FE to keep the image size significantly smaller)
WORKDIR /app/src/server
RUN npm ci --omit=dev

# Runtime stage
FROM node:14-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/src/server/node_modules ./node_modules
COPY --from=build /app/dist ./dist

CMD [ "npm", "start" ]
