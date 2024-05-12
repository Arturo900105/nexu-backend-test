# nexu-backend-test

Este proyecto es resultado de una prueba técnica para Nexu, que tiene como objetivo mostrar algunas de las habilidades
del programador desarrollando aplicaciones backend.

# Requisitos Previos

Para trabajar/ejecutar con este proyecto debes tener previamente instaladas las siguientes herramientas:

- Docker Descktop
- Node.js
- PostgreSQL (opcional - lee el apartado [Opcon 1](#ejecutar-aplicación-opcion-1)})

# Instalación

```bash
npm install
npm install -g knex
npm install -g nodemon
```

# Configuración

Crea los archivos `.env.dev`,`.env.prod` y `.env.test` dentro del directorio `config/environment` con las siguientes
variables:

```plaintext
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
HOST_PORT=
```

los valores te serán enviados por e-mail

# Ejecutar aplicación (Opcion 1)

Para ejecutar la aplicación solo es neceario ejecutar el siguiente comando.

```bash
docker compose --env-file ./config/environment/.env.prod up
```

Las tareas que realiza son:

- Lo que hace es descargar la imágen de postgres, crear su contenedor y arrancarlo
- Generar una imagen de nuestra aplicación, crear un contenedor y arrancarlo.

Para detener los contenedores y borrarlos debes ejecutar:

```bash
docker compose --env-file ./config/environment/.env.prod down
```

# Ejecutar aplicación (Opcion 2)

## Base de Datos

Para la gestión y control de la base de datos se implementaron migraciones con `knex.js`.
Las migraciones se guardan dentro del directorio `migrations`, para aplicarlas ejecuta el siguiente comando dentro de la
carpeta del proyecto.

```bash
knex migrate:latest
```

# Uso

Ésta aplicación cuenta con las siguientes rutas:

```
                              GET    /brands
                              GET    /brands/:id/models
                              POST   /brands
                              POST   /brands/:id/models
                              PUT    /models/:id
                              GET    /models
```

#### GET /brands

Devuelve una lista de todas las marcas en formato Json

```json
[
  {
    "id": 1,
    "nombre": "Acura",
    "average_price": 702110
  },
  {
    "id": 2,
    "nombre": "Audi",
    "average_price": 630759
  },
  "..."
]
```

El valor de `average_price` es el promedio del valor de `average_price` de sus modelos.

#### GET /brands/:id/models

Devuelve una lista con todos los modelos que pertenecen a la marca

```json
[
  {
    "id": 1,
    "name": "ILX",
    "average_price": 303176
  },
  {
    "id": 2,
    "name": "MDX",
    "average_price": 448193
  },
  "..."
]
```

#### POST /brands

Permite agregar más marcas siempre y cuando no existan en la BD.

```json
{
  "name": "Toyota"
}
```

#### POST /brands/:id/models

Permite agregar nuevos modelos a una marca siempre y cuando no exista ese modelo para esa marca y que el valor
de `average_price` sea mayor a 100,000.

```json
{
  "name": "Prius",
  "average_price": 406400
}
```

#### PUT /models/:id

Permite modificar el valor de `average_price` del modelo indicado, siempre y cuando sea mayor a 100,000

```json
{
  "average_price": 406400
}
```

#### GET /models?greater=&lower=

Devuelve una lista con todos los modelos. Además acepta los filtros `greater` y `lower`
Si `greater` es enviado, entonces devuelve todos los modelos con un `average_price` mayor al indicado
Si `lower` es enviado, entonces devuelve todos los modelos con un `average_price` menor al indicado

```
# /models?greater=380000&lower=400000
```

```json
[
  {
    "id": 3,
    "name": "RDX",
    "average_price": 395753
  },
  {
    "id": 171,
    "name": "Wrangler",
    "average_price": 396757
  },
  "..."
]
```

## Pruebas

Información sobre cómo ejecutar las pruebas automatizadas.

```bash
npm test
```

## Construido con

- [Express.js](https://expressjs.com/) - El framework web usado
- [PostgreSQL](https://www.mongodb.com/) - Base de datos
- [Node.js](https://nodejs.org/) - Entorno de ejecución

## Autores

- **ISC. Arturo Sánchez Fonseca**
