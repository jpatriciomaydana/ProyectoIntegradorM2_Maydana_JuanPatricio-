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
├── src/
│   ├── db/
│   │   ├── pool.js         # Configuración del pool de conexión a PostgreSQL
│   │   └── setup.sql       # Script DDL/DML de la base de datos (Tablas + Seeds)
│   ├── services/           # Capa de Acceso a Datos / Lógica de Negocio
│   │   ├── authorService.js
│   │   ├── postService.js
│   │   └── commentService.js
│   ├── controllers/        # Capa de Controladores (Manejo de Request/Response)
│   │   ├── authorController.js
│   │   ├── postController.js
│   │   └── commentController.js
│   ├── routes/             # Capa de Enrutamiento
│   │   ├── authorRoutes.js
│   │   ├── postRoutes.js
│   │   ├── commentRoutes.js
│   │   └── healthRoutes.js
│   └── app.js              # Inicialización y middleware de Express
├── test/                   # Pruebas integradas y unitarias
│   ├── authors.test.js
│   ├── posts.test.js
│   └── comments.test.js
├── openapi.yaml            # Especificación de OpenAPI 3.1.1
├── index.js                # Punto de entrada del servidor
├── .env.example            # Plantilla de variables de entorno
└── README.md

📊 Modelo de Datos (PostgreSQL)

La base de datos cuenta con tres entidades principales vinculadas mediante claves foráneas y la restricción ON DELETE CASCADE para asegurar la integridad referencial:
1.	authors: Guarda la información de los creadores de contenido (ID, Nombre, Email único, Bio, Fecha de registro).
2.	posts: Almacena las publicaciones asociadas a un autor (ID, Título, Contenido, ID Autor, Estado de publicación, Fecha de creación).
3.	comments: Mantiene los comentarios realizados sobre un post (ID, ID Post, ID Autor [opcional para comentarios anónimos], Contenido, Fecha de creación).

⚙️ Configuración e Instalación Local

Prerrequisitos
•	Node.js (v18 o superior)
•	npm
•	Instancia local o remota de PostgreSQL

Pasos de Instalación

1.	Clonar el repositorio:
Bash
git clone [https://github.com/TU_USUARIO/PROYECTOINTEGRADORM2_MAYDANAJUANPATRICIO.git](https://github.com/TU_USUARIO/PROYECTOINTEGRADORM2_MAYDANAJUANPATRICIO.git)
cd PROYECTOINTEGRADORM2_MAYDANAJUANPATRICIO

2.	Instalar dependencias:
Bash
npm install

3.	Configurar variables de entorno: Copiá el archivo .env.example y renombralo a .env:
Bash
cp .env.example .env
Completá las credenciales de tu base de datos local en el .env:
Fragmento de código
PORT=3000
DATABASE_URL=postgres://tu_usuario:tu_contraseña@localhost:5432/miniblog_db

4.	Inicializar la base de datos: Ejecutá el script ubicado en src/db/setup.sql en tu cliente de PostgreSQL (pgAdmin, DBeaver o psql) para crear las tablas e insertar los datos iniciales.

5.	Iniciar el servidor en desarrollo:
Bash
npm run dev

La API estará corriendo en http://localhost:3000 y la documentación interactiva en http://localhost:3000/api-docs.

🧪 Ejecución de Tests

Las pruebas automatizadas están desarrolladas con Jest y Supertest para validar las respuestas HTTP y el correcto funcionamiento de la API.
Para ejecutar la suite completa de tests:
Bash
npm test

🤖 Declaración sobre el uso de Inteligencia Artificial

Durante el desarrollo de este proyecto integrador se hizo uso de asistentes de Inteligencia Artificial (Gemini / Claude) como herramienta de soporte técnico para:

•   Consultas de errores y guia en solucion 
•	La revisión de sintaxis y diseño del esquema OpenAPI 3.1.1 en YAML.
•	La optimización de las consultas SQL parametrizadas para prevenir inyecciones SQL.
•	La estructuración del flujo de trabajo.
Todas las soluciones implementadas fueron revisadas, testeadas, comprendidas y adaptadas manualmente por el autor para garantizar el cumplimiento estricto de los requisitos del proyecto.

Aqui algunos ejemplos:




👤 Autor
•	Juan Patricio Maydana — Estudiante de Desarrollo Full Stack (FT77)
