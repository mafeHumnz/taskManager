# 1. ¿Qué sistema operativo y entorno usamos? (Imagen Base)
FROM node:20

# 2. ¿Dónde vamos a meter los archivos dentro del contenedor?
WORKDIR /app

# 3. Copiamos los archivos de dependencias primero (Optimización)
COPY package*.json ./

# 4. Instalamos las librerías
RUN npm install

# 5. Copiamos el resto de nuestro código
COPY . .

# 6. ¿En qué puerto va a trabajar nuestro contenedor?
EXPOSE 3000

# 7. El comando final para encender la app
CMD ["node", "src/server.js"]