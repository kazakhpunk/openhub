# Morphic template (if Next.js app; default to 3003)
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
RUN corepack enable
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build || echo "Build skipped"

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/.next ./.next 2>/dev/null || true
COPY --from=builder /app/public ./public 2>/dev/null || true
EXPOSE 3003
CMD ["pnpm","start"]

# Base image
FROM oven/bun:1.2.12 AS builder

WORKDIR /app

# Install dependencies (separated for better cache utilization)
COPY package.json bun.lock ./
RUN bun install

# Copy source code and build
COPY . .
RUN bun next telemetry disable
RUN bun run build

# Runtime stage
FROM oven/bun:1.2.12 AS runner
WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock
COPY --from=builder /app/node_modules ./node_modules

# Start production server
CMD ["bun", "start", "-H", "0.0.0.0"]
