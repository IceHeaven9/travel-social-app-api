# API REST CRUD para Red Social de Viajes

## Descripción

Este proyecto consiste en la construcción desde cero de una API REST CRUD para una red social de viajes. Utiliza un servidor propio y una base de datos relacional. La API incluye diversas funcionalidades avanzadas que se detallan a continuación.

## Funcionalidades

- **Autenticación**: Autenticación segura mediante JSON Web Tokens (JWT).
- **Subida de Imágenes**: Soporte para la subida de imágenes de perfil y publicaciones.
- **Validación de Datos**: Validación de datos de entrada utilizando la biblioteca Joi.
- **Envío de Correos Electrónicos**: Envío de correos electrónicos para verificación de cuenta y otras notificaciones mediante Nodemailer.
- **Paginación**: Implementación de paginación para la recuperación de listas de datos.
- **Registro de Correos Electrónicos**: Registro y verificación de usuarios por correo electrónico.
- **Log de Solicitudes**: Registro de solicitudes HTTP mediante Morgan.
- **Manejo de Errores**: Manejo avanzado de errores y respuestas estándar.
- **Optimización de Imágenes**: Redimensionamiento y optimización de imágenes utilizando Sharp.

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
        DATABASE_HOST=localhost
        DATABASE_USER=root
        DATABASE_PASSWORD=password
        DATABASE_NAME=nombre_base_datos
        JWT_SECRET=tu_secreto_jwt
        EMAIL_HOST=smtp.ejemplo.com
        EMAIL_PORT=587
        EMAIL_USER=tu_email@ejemplo.com
        EMAIL_PASSWORD=tu_password_email

## Uso

1.  Iniciar el servidor:

        npm run dev

2.  La API estará disponible en `http://localhost:3000`.

## Endpoints

### Autenticación

- **Registro de Usuario**: `POST /api/auth/register`
- **Inicio de Sesión**: `POST /api/auth/login`
- **Verificación de Correo Electrónico**: `GET /api/auth/verify/:token`

### Usuarios

- **Obtener Perfil de Usuario**: `GET /api/users/:id`
- **Actualizar Perfil de Usuario**: `PUT /api/users/:id`
- **Eliminar Usuario**: `DELETE /api/users/:id`

### Publicaciones

- **Crear Publicación**: `POST /api/posts`
- **Obtener Todas las Publicaciones**: `GET /api/posts`
- **Obtener Publicación por ID**: `GET /api/posts/:id`
- **Actualizar Publicación**: `PUT /api/posts/:id`
- **Eliminar Publicación**: `DELETE /api/posts/:id`

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los pasos a continuación:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva funcionalidad (`git checkout -b nueva-funcionalidad`).
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin nueva-funcionalidad`).
5. Abre un Pull Request.

## Contacto

Para cualquier duda o consulta, puedes contactarme en cristhian_devfs@outlook.com.
