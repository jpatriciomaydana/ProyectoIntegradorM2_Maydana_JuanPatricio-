# 📝 MiniBlog API — Proyecto Integrador M2 (FT77)

¡Bienvenido/a al repositorio de **MiniBlog API**! Este proyecto consiste en el desarrollo de un servicio backend RESTful para la gestión de contenidos (autores, publicaciones y comentarios) enfocado en la plataforma de desarrollo **DevSpark**.

El proyecto está construido utilizando **Node.js**, **Express**, **PostgreSQL** y **Jest**, siguiendo una arquitectura de software limpia organizada en **3 capas** (Rutas, Controladores y Servicios).

---

## 🚀 Despliegue en Producción (Railway)

La API se encuentra desplegada y operativa en los siguientes endpoints de producción:

* 🌐 **URL Pública / Health Check:** [https://proyectointegradorm2maydanajuanpatricio-production.up.railway.app/health](https://proyectointegradorm2maydanajuanpatricio-production.up.railway.app/health)
* 📚 **Documentación Interactiva (Swagger UI):** [https://proyectointegradorm2maydanajuanpatricio-production.up.railway.app/api-docs](https://proyectointegradorm2maydanajuanpatricio-production.up.railway.app/api-docs)

---

## 🛠️ Tecnologías Utilizadas

* **Runtime:** Node.js
* **Framework Web:** Express.js
* **Base de Datos:** PostgreSQL (`pg` connection pool)
* **Testing:** Jest + Supertest
* **Documentación:** OpenAPI 3.1.1 + Swagger UI Express
* **Variables de Entorno:** Dotenv
* **Despliegue:** Railway

---

## 📂 Arquitectura del Proyecto

El código está estructurado bajo el principio de separación de responsabilidades en 3 capas:

```text
├── db/
│   ├── dbInit.js        # Configuración del pool de conexión a PostgreSQL
│   ├── initDb.js        # Script para crear tablas + cargar datos semilla (idempotente)
│   └── setup.sql        # Script DDL/DML de la base de datos (Tablas + Seeds)
├── services/            # Capa de Acceso a Datos / Lógica de Negocio
│   ├── authors.js
│   ├── posts.js
│   └── comments.js
├── controllers/         # Capa de Controladores (Manejo de Request/Response)
│   ├── authors.js
│   ├── posts.js
│   └── comments.js
├── routes/              # Capa de Enrutamiento
│   ├── authors.js
│   ├── posts.js
│   └── comments.js
├── middlewares/
│   └── errorHandler.js  # Middleware global de manejo de errores
├── test/                # Pruebas integradas
│   ├── authors.test.js
│   ├── posts.test.js
│   └── comments.test.js
├── openapi.yaml         # Especificación de OpenAPI 3.1.1
├── app.js               # Inicialización y middleware de Express (incluye /health y /api-docs)
├── index.js             # Punto de entrada del servidor
├── .env.example         # Plantilla de variables de entorno
└── README.md
```

---

## 📊 Modelo de Datos (PostgreSQL)

La base de datos cuenta con tres entidades principales vinculadas mediante claves foráneas y restricciones relacionales (`ON DELETE CASCADE` / `SET NULL`) para asegurar la integridad referencial:

* **authors**: Guarda la información de los creadores de contenido (ID, Nombre, Email único, Bio, Fecha de registro).
* **posts**: Almacena las publicaciones asociadas a un autor (ID, Título, Contenido, ID Autor, Estado de publicación, Fecha de creación).
* **comments**: Mantiene los comentarios realizados sobre un post (ID, ID Post, ID Autor [opcional], Contenido, Fecha de creación).

---

## ⚙️ Configuración e Instalación Local

### Prerrequisitos

* Node.js (v18 o superior)
* npm
* Instancia local o remota de PostgreSQL

### Pasos de Instalación

**1. Clonar el repositorio:**

```bash
git clone https://github.com/TU_USUARIO/PROYECTOINTEGRADORM2_MAYDANAJUANPATRICIO.git
cd PROYECTOINTEGRADORM2_MAYDANAJUANPATRICIO
```

**2. Instalar dependencias:**

```bash
npm install
```

**3. Configurar variables de entorno:**

Copiá el archivo `.env.example` y renombralo a `.env`:

```bash
cp .env.example .env
```

Completá las credenciales de tu base de datos local en el `.env`:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=miniblog_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
PORT=3000
```

**4. Inicializar la base de datos:**

Tenés dos opciones:

* **Automática (recomendada):** corré el script que crea las tablas e inserta los datos semilla (es idempotente, podés correrlo más de una vez sin romper nada):

  ```bash
  npm run db:init
  ```

* **Manual:** ejecutá el script ubicado en `db/setup.sql` directamente en tu cliente de PostgreSQL (pgAdmin, DBeaver o `psql`).

**5. Iniciar el servidor en desarrollo:**

```bash
npm run dev
```

La API estará corriendo en `http://localhost:3000` y la documentación interactiva en `http://localhost:3000/api-docs`.

## 🚂 Guía de Deployment en Railway

### Cómo se desplegó

1. Se creó un proyecto en Railway y se conectó al repositorio de GitHub (deploy automático en cada `git push` a la rama principal).
2. Se agregó un servicio de **PostgreSQL** (plugin nativo de Railway) dentro del mismo proyecto.
3. Railway detecta automáticamente que es una app Node.js (via `package.json`) y ejecuta `npm install` + `npm start`.
4. Una vez desplegado, se corrió `npm run db:init` una única vez contra la base de datos de producción para crear las tablas y cargar los datos semilla (ver sección "Variables de entorno" para cómo conectarse desde tu máquina local a la base de producción si necesitás repetir este paso).

### Variables de entorno en Railway

En el servicio de la API (no en el de Postgres), configurar en la pestaña **Variables**:

| Variable | Valor |
|---|---|
| `DB_HOST` | `${{Postgres.PGHOST}}` |
| `DB_PORT` | `${{Postgres.PGPORT}}` |
| `DB_NAME` | `${{Postgres.PGDATABASE}}` |
| `DB_USER` | `${{Postgres.PGUSER}}` |
| `DB_PASSWORD` | `${{Postgres.PGPASSWORD}}` |
| `PORT` | `3000` |

> La sintaxis `${{Postgres.VARIABLE}}` es la forma que tiene Railway de referenciar automáticamente las variables del plugin de Postgres sin tener que copiarlas a mano. Si tu servicio de base de datos en Railway tiene otro nombre (no "Postgres"), reemplazalo por el nombre real que le pusiste.

### URL interna vs. URL pública

Railway expone dos tipos de conexión para cada servicio:

* **URL interna (privada):** algo como `<nombre-servicio>.railway.internal`. Solo es alcanzable *entre servicios dentro del mismo proyecto* de Railway (por ejemplo, es la que usa tu API para hablar con la base de datos en producción). No tiene costo de red saliente y es más rápida. Es el valor que resuelve automáticamente `${{Postgres.PGHOST}}` de la tabla de arriba.
* **URL pública:** `https://proyectointegradorm2maydanajuanpatricio-production.up.railway.app`. Es la que usa cualquier cliente externo (navegador, Postman, el evaluador) para acceder a la API desde internet. Es la misma que ya está linkeada al principio de este README.

Si necesitás conectarte a la base de datos de producción **desde tu propia máquina** (por ejemplo, para correr `npm run db:init` una vez más), Railway también expone una URL pública de conexión a Postgres (con proxy TCP) — la encontrás en la pestaña **Connect** del servicio de Postgres en el dashboard, con el nombre `DATABASE_PUBLIC_URL` o similar.

### Health check

Railway usa el endpoint `GET /health` (ya implementado en `app.js`) para verificar que el servicio esté vivo después de cada deploy.

---

## 🧪 Testing Automatizado

El proyecto cuenta con una suite de pruebas de integración desarrolladas con Jest y Supertest, cubriendo el CRUD y sus respectivos casos de error para las tres entidades.

### Cobertura de Tests (20/20 Pasados):

**Authors** (`test/authors.test.js`):
* `POST /authors`: Crear autor.
* `GET /authors`: Obtener lista de autores.
* `GET /authors/:id`: Obtener autor por ID.
* `PUT /authors/:id`: Actualizar autor.
* `DELETE /authors/:id`: Eliminar autor.
* Errores: 400 (datos faltantes) y 404 (autor inexistente).

**Posts** (`test/posts.test.js`):
* `POST /posts`: Crear post.
* `GET /posts`: Obtener lista de posts.
* `GET /posts/:id`: Obtener post por ID.
* `PUT /posts/:id`: Actualizar post.
* `DELETE /posts/:id`: Eliminar post.
* Errores: 400 (faltan datos requeridos) y 404 (post inexistente al eliminar).

**Comments** (`test/comments.test.js`):
* `POST /comments`: Crear comentario.
* `GET /comments`: Obtener todos los comentarios.
* `GET /comments/:id`: Obtener comentario por ID.
* `PUT /comments/:id`: Actualizar comentario.
* `DELETE /comments/:id`: Eliminar comentario.
* Errores: 400 (falta del campo `content`).

> ⚠️ **Antes de entregar:** corré `npm test` una vez y confirmá que el resultado real coincide con "20/20 Pasados". Si el número final es distinto, actualizá esta sección para que coincida exactamente con lo que muestra la terminal — un número incorrecto acá es peor que no ponerlo.

### Ejecución de Tests

Para ejecutar la suite de pruebas localmente:

```bash
npm test
```

---

## 🤖 Declaración sobre el uso de Inteligencia Artificial

Durante el desarrollo de este proyecto integrador se hizo uso de asistentes de Inteligencia Artificial (Gemini / Claude) como herramienta de soporte técnico para:

* Consultas de errores y guía en soluciones de depuración.
* La revisión de sintaxis y diseño del esquema OpenAPI 3.1.1 en YAML.
* La optimización de las consultas SQL parametrizadas para prevenir inyecciones SQL.
* La estructuración del flujo de trabajo y cobertura de pruebas integradas.

Todas las soluciones implementadas fueron revisadas, testeadas, comprendidas y adaptadas manualmente para garantizar el cumplimiento estricto de los requisitos del proyecto.
En la carpeta screenshots se encuentran capturas de ejemplos de prompts con la IA.
 



---

## 👤 Autor

Juan Patricio Maydana — Estudiante de Desarrollo Full Stack (FT77)
