# API REST CRUD para Red Social de Viajes

## Descripción

Este proyecto consiste en la construcción desde cero de una API REST CRUD para una red social de viajes. Utiliza un servidor propio y una base de datos relacional. La API incluye diversas funcionalidades avanzadas que se detallan a continuación.

## Funcionalidades

- **Autenticación**: Autenticación segura mediante JSON Web Tokens (JWT).
- **Subida de Imágenes**: Soporte para la subida de imágenes de perfil y publicaciones.
- **Optimización de Imágenes**: Redimensionamiento y optimización de imágenes utilizando Sharp.
- **Validación de Datos**: Validación de datos de entrada utilizando la biblioteca Joi.
- **Envío de Correos Electrónicos**: Envío de correos electrónicos para verificación de cuenta y otras notificaciones mediante Nodemailer.
- **Registro de Correos Electrónicos**: Registro y verificación de usuarios por correo electrónico.
- **Log de Solicitudes**: Registro de solicitudes HTTP mediante Morgan.
- **Manejo de Errores**: Manejo avanzado de errores y respuestas estándar.

## Dependencias

    "dependencies": {

      "bcrypt": "^5.1.1",
      "dotenv": "^16.4.5",
      "eslint": "^9.5.0",
      "express": "^4.19.2",
      "express-fileupload": "^1.5.0",
      "joi": "^17.13.1",
       "jsonwebtoken": "^9.0.2",
       "morgan": "^1.10.0",
       "mysql2": "^3.10.0",
       "nodemailer": "^6.9.13",
       "prettier": "^3.3.2",
       "sharp": "^0.33.4"},

       "devDependencies": {
           "@faker-js/faker": "^8.4.1",
           "nodemon": "^3.1.3"}

## Instalación

1.  Clonar el repositorio:

        git clone https://github.com/tuusuario/nombre-del-repositorio.git

2.  Navegar al directorio del proyecto:

        cd nombre-del-repositorio

3.  Instalar las dependencias:

        npm install

## Configuración

1.  Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

        PORT=3000
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=password
        DB_NAME=nombre_base_datos
        JWT_SECRET=tu_secreto_jwt
        EMAIL_HOST=smtp.ejemplo.com
        EMAIL_PORT=587
        EMAIL_USER=tu_email@ejemplo.com
        EMAIL_PASSWORD=tu_password_email
        FRONTEND_HOST=http://localhost:5173

## Base de datos

1.  Crear la base de datos y las tablas:

        npm run init-db

2.  Añade el usuario de administrador:

        npm run initial-data

3.  Añade las semillas de datos:

        npm run demo-seeds

## Uso

1.  Iniciar el servidor:

        npm run dev

2.  La API estará disponible en `http://localhost:3000`.

## Endpoints

### Autenticación

- **Registro de Usuario**: `POST /api/register`
- **Inicio de Sesión**: `POST /api/login`
- **Verificación de Correo Electrónico**: `POST /api/validate-email`

### Perfil

- **Actualizar email de Usuario**: `PATCH /api/profile/email`
- **Actualizar la contraseña de Usuario**: `PATCH /api/profile/password`
- **Cambia la informacion del perfil de usuario**: `PATCH /api/profile`

### Travels

- **Crear Publicación**: `POST /api/travels`
- **Buscar un travel**: `GET /travels/search`
- **Obtener Todas las Publicaciones**: `GET /api/travels`
- **Obtener Publicación por ID**: `GET /api/travels/:travelId`
- **Actualizar Publicación**: `PATCH /api/travels/:travelId`
- **Eliminar Publicación**: `DELETE /api/travels/:travelId`

### Imagenes de un Travel

- **Subir una o varias imagenes**: `POST /travels/:travelId/photos`
- **Obtener una o varias imagenes**: `GET /travels/:travelId/photos`
- **Borrar imagenes**: `DELETE /travels/:travelId/photos`

### Reacciónes

- **Añadir reacción**: `POST /travels/:travelId/reactions`
- **Borrar reacción**: `DELETE /travels/:travelId/reactions`

### Compañeros

- **Añadir compañero**: `POST /travels/:travelId/companions`
- **Obtener compañero por el id del travel**: `GET /travels/:travelId/companions`
- **Obtener un compañero por el id de usuario**: `GET /travels/:travelId/companions`

### Comentarios

- **Añadir comentario**: `POST /api/travels/:travelId/comments`
- **Obtener comentaios de un travel**: `GET /travels/:travelId/comments`
- **Editar comentario**: `PATCH /api/travels/:travelId/comments/:commentId`
- **Eliminar comentario**: `DELETE /api/travels/:travelId/comments/commentId`

### El front-end para esta API está en desarrollo, por lo que todavía se están haciendo modificaciones para cubrir las necesidades que surjan en el futuro. Cualquier modificación será incluida en este README.

## Contacto

Para cualquier duda o consulta, puedes contactarme en cristhian_devfs@outlook.com.

## Licencia

© 2024 Cristhian Medrano Bonora. Todos los derechos reservados.
