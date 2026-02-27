# ── Stage 1: Install dependencies and build ──────────────────
FROM oven/bun:1.3.5-alpine AS builder

WORKDIR /app

# Copy workspace config files first (better caching)
COPY package.json bun.lock turbo.json ./
COPY apps/web/package.json apps/web/
COPY packages/configs/package.json packages/configs/
COPY packages/ui/package.json packages/ui/
COPY packages/shared/package.json packages/shared/

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source files
COPY apps/web/ apps/web/
COPY packages/ packages/

# Build the app
RUN cd apps/web && bunx react-router build

# ── Stage 2: Serve with Nginx ────────────────────────────────
FROM nginx:1.29.5-alpine-slim

# Copy custom Nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files
COPY --from=builder /app/apps/web/build/client /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
