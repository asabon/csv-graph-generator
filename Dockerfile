FROM node:20-slim

# Install system dependencies for canvas
RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
# We use npm ci to install exactly what's in package-lock.json
RUN npm ci --omit=dev && npm cache clean --force

# Copy source code and build
COPY . .
RUN npm run build

# Entry point
ENTRYPOINT ["node", "/app/dist/index.js"]
