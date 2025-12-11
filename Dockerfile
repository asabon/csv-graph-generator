FROM node:20-slim

# Install system dependencies for canvas
RUN apt-get update && apt-get install -y \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# Install ALL dependencies (including devDependencies like typescript)
RUN npm ci

COPY . .

# Build the project (Compile TypeScript to JavaScript in /lib)
RUN npm run build

# Start with the compiled file (tsc outputs to lib/main.js by default config)
ENTRYPOINT ["node", "/app/lib/main.js"]
