# 🛍️ ClotStore

**Proyecto Fullstack --- Tienda de Ropa y Calzado**

ClotStore es una tienda de ropa y calzado en línea desarrollada con
**React** en el frontend y **Node.js + Express + MySQL + Sequelize** en
el backend.\
Incluye gestión completa de usuarios, productos, categorías,
proveedores, carrito de compras y envío de correos con el detalle de la
compra.

Este proyecto **no es una demo**, sino una aplicación totalmente
**funcional**, creada como parte del **Trabajo Final (EFI)**.

------------------------------------------------------------------------

## 📌 Requisitos

-   Node.js ≥ 18\
-   npm ≥ 9\
-   Python ≥ 3.10\
-   MySQL ≥ 8.0

------------------------------------------------------------------------

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

``` bash
git clone https://github.com/cuelloguille/efi_VentaDEROPA
cd efi_VentaDEROPA
```

------------------------------------------------------------------------

## 📁 Estructura del proyecto

    /backend
       ├── config
       ├── controllers
       ├── models
       ├── routes
       ├── utils
       └── server.js
    /frontend
       ├── public
       ├── src
       └── vite.config.js
    README.md
    package-lock.json

------------------------------------------------------------------------

# 🔧 Backend

## 1. Configuración del entorno

Crear un archivo **.env** dentro de la carpeta `backend`:

    DB_NAME=tiendaDB
    DB_USER=admin
    DB_PASSWORD=tu_contraseña
    DB_HOST=localhost
    PORT=4000
    JWT_SECRET=miclaveultrasecreta123

------------------------------------------------------------------------

## 2. Instalar dependencias

``` bash
cd back
npm install
```

------------------------------------------------------------------------

## 3. Configurar la base de datos

Abrir MySQL:

``` bash
sudo mysql -u root
```

Crear la base y permisos:

``` sql
CREATE DATABASE tiendaDB;

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'tu_contraseña';

GRANT ALL PRIVILEGES ON tiendaDB.* TO 'admin'@'localhost';

FLUSH PRIVILEGES;
EXIT;
```

------------------------------------------------------------------------

## 4. Ejecutar el backend

``` bash
cd back
npm start
```

o

``` bash
npm run dev
```

El backend estará corriendo en: **http://localhost:4000**

------------------------------------------------------------------------

# 🎨 Frontend

## 1. Instalar dependencias

``` bash
cd front
npm install
```

------------------------------------------------------------------------

## 2. Iniciar el servidor de desarrollo

``` bash
npm run dev
```

El frontend estará disponible en: **http://localhost:5173**

------------------------------------------------------------------------

# 🌐 Rutas principales del Backend

## 📁 Categorías --- `/categories`

  Método   Ruta   Descripción
  -------- ------ ------------------
  GET      /      Listar todas
  POST     /      Crear (admin)
  PUT      /:id   Editar (admin)
  DELETE   /:id   Eliminar (admin)

------------------------------------------------------------------------

## 🚚 Proveedores --- `/suppliers`

  Método   Ruta   Descripción
  -------- ------ ------------------
  GET      /      Listar todos
  POST     /      Crear (admin)
  PUT      /:id   Editar (admin)
  DELETE   /:id   Eliminar (admin)

------------------------------------------------------------------------

## 👕 Prendas --- `/clothes`

CRUD completo:

-   Subida de imágenes\
-   Relación con categoría\
-   Relación con proveedor

------------------------------------------------------------------------

## 🛒 Carrito / Compra --- `/email/enviar-correo`

  ----------------------------------------------------------------------------
  Método   Ruta                   Descripción
  -------- ---------------------- --------------------------------------------
  POST     /email/enviar-correo   Envía correo de confirmación de compra

  ----------------------------------------------------------------------------

------------------------------------------------------------------------

# 🧩 Funcionalidades del sistema

## 👨‍💼 Vista Administrador (Panel de Gestión)

El administrador puede:

✔ Crear, editar y eliminar prendas\
✔ Crear, editar y eliminar categorías\
✔ Crear, editar y eliminar proveedores\
✔ Gestionar inventario\
✔ Subir imágenes de productos\
✔ Usar filtros y búsquedas en el navbar

------------------------------------------------------------------------

## 🛍️ Vista Usuario (Comprador)

El usuario puede:

✔ Registrarse e iniciar sesión\
✔ Navegar y buscar prendas desde el navbar\
✔ Agregar productos al carrito\
✔ Vaciar el carrito\
✔ Realizar compras\
✔ Recibir un correo con el detalle de compra

------------------------------------------------------------------------

# 👥 Autores

Trabajo realizado por:\
- **Guillermo Cuello**\
- **Agostina Bringas**\
- **Micaela Cortez**\
- **Bruno Sanches**
