FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy rest of the code
COPY . .

# Expose backend port (change if needed)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]