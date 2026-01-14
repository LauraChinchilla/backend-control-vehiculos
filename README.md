# Cómo levantar la app 🚀

## Base de datos

En este repositorio he creado la carpeta `database/` y allí encontrará el archivo: control_vehiculos.sql


Este archivo contiene **todas las tablas y datos iniciales** que necesita la aplicación para funcionar. Antes de levantar el backend, importar este archivo en local


## Backend (API)

1. Entrar a la carpeta del backend: cd backend-control-vehiculos


2. Instalar dependencias: npm install


3. Crear un archivo `.env` con los datos de conexión a la base de datos:

DB_HOST=localhost
DB_USER=Su_Usuario
DB_PASSWORD=SU_Password
DB_NAME=BD_NAME (control_vehiculos)
PORT=3001


4. Levantar el servidor:

npm run dev


- La API queda disponible en `http://localhost:3001`.
