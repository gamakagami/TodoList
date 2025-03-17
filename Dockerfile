# Use Node.js lightweight image
FROM node:18-alpine  

# Set working directory
WORKDIR /app  

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install  

# Copy the rest of the app
COPY . .  

# Expose port 5173 (Vite default)
EXPOSE 5173  

# Start Vite dev server
CMD ["npm", "run", "dev", "--", "--host"]  
