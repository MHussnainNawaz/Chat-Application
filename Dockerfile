# Backend ke liye Node.js base image
FROM node:18

# App directory
WORKDIR /app

# Package files copy karo
COPY package*.json ./

# Dependencies install karo
RUN npm install

# Baaki files copy karo
COPY . .

# App ka port expose karo (agar tum index.js me 8080 use kar rahe ho)
EXPOSE 8080

# Start command
CMD ["node", "index.js"]
