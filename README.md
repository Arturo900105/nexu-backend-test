
# nexu-backend-test

Este proyecto es resultado de una prueba técnica para Nexu, que tiene como objetivo mostrar algunas de las habilidades del programador desarrollando aplicaciones backend.

## Requisitos Previos

Para trabajar/ejecutar con este proyecto debes tener previamente instaladas las siguientes herramientas:
- Node.js (v18.x o superior)
- PostgreSQL
- Docker

## Instalación

Para poder correr el Proyecto localmente corre los siguientes comandos.

```bash
npm install                 // instalar las dependencias del proyecto
npm install -g knex         // Necesario para manejar migraciones
npm install -g nodemon      // Para agilizar el desarrollo 
```
Para instalar unicamente la base de datos desde docker, ejecuta lo siguiente
```bash
docker run -p5432:5432 -e POSTGRES_PASSWORD=<tu_password> -e POSTGRES_USER=<tu_usuario> -d postgres
```
Los datos para este ejemplo se encuentran en un archivo llamado `models.json` que se encuentra en la raíz del proyecto.
Para pasarlos a la base de datos, es necesario ejecutar las migraciones.

Ejecuta el siguiente comando.

```bash
npm run run-migrations
```

## Configuración

Crea los archivos `.env.local`,`.env.production` y `.env.test` en el directorio `config/global` con el siguiente contenido:

Para correr el proyecto completo con docker, el valor de `DB_HOST` debe ser `postgres` (`DB_HOST=postgres`).

Si optas por solo usar postgres desde una imagen de docker, manten los datos como los siguientes.

```plaintext
DB_USER=<tu_usuario>
DB_HOST=localhost
DB_NAME=postgres
DB_PASSWORD=<tu_password>
DB_PORT=5432
HOST_PORT=3000
```
No olvides sustituir `<tu_usuario>` y `<tu_password>` con los que hayas indicado al crear tu contenedor de postgreSQL.

## Ejecutar la Aplicación

Para ejecutar toda la aplicación con docker, ejecuta el siguiente comando

```bash
npm start
```

O usando nodemon para desarrollo:

```bash
nodemon start
```

## Uso

Descripción de cómo usar la aplicación, incluyendo ejemplos de solicitudes HTTP que se pueden hacer a la API.

Por ejemplo:

```bash
curl -X GET http://localhost:3000/api/recursos
```

## Pruebas

Información sobre cómo ejecutar las pruebas automatizadas.

```bash
npm test
```

## Despliegue

Instrucciones específicas para desplegar la aplicación en un entorno de producción.

## Construido con

- [Express.js](https://expressjs.com/) - El framework web usado
- [PostgreSQL](https://www.mongodb.com/) - Base de datos
- [Node.js](https://nodejs.org/) - Entorno de ejecución

## Autores

- **ISC. Arturo Sánchez Fonseca**
