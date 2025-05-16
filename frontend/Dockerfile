FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serveur de fichiers statiques (serve)
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "dist"]
