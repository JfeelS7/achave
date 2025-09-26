# Dockerfile para aplicação Node.js com TypeScript e Prisma
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/public ./dist/public
COPY .env .env
RUN npm install --omit=dev
RUN npx prisma generate
EXPOSE 3000
CMD ["node", "dist/index.js"]
