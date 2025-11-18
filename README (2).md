
# ClotStore

ClotStore es una tienda de ropa y calzado en línea desarrollada con **React** en el frontend y **Node.js + Express + MySQL + Sequelize** en el backend.  
Incluye gestión de usuarios, productos, categorías y proveedores, carrito de compras y envío de correo al finalizar la compra.

## Installation

### Backend

1. Clonar el repositorio:

```bash
git clone https://github.com/cuelloguille/efi_VentaDEROPA.git
cd efi_VentaDEROPA/backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno creando un archivo `.env`:

```
DB_NAME=tiendaDB
DB_USER=admin
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
PORT=4000
JWT_SECRET=miclaveultrasecreta123
```

4. Configurar la base de datos MySQL:

```sql
sudo mysql -u root
CREATE DATABASE tiendaDB;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'tu_contraseña';
GRANT ALL PRIVILEGES ON tiendaDB.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
exit
```

5. Ejecutar backend:

```bash
npm start
# o
npm run dev
```

El backend estará corriendo en `http://localhost:4000`.

### Frontend

1. Entrar a la carpeta frontend:

```bash
cd ../frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar servidor de desarrollo:

```bash
npm run dev
```

El frontend estará corriendo en `http://localhost:5173`.

> ⚠️ Importante: El backend debe estar corriendo al mismo tiempo que el frontend.

## Usage

### Funcionalidades principales

#### Vista Administrador

- Crear, editar y eliminar **prendas**, **categorías** y **proveedores**.
- Gestión completa del inventario.

#### Vista Usuario

- Navegar y filtrar productos.
- Agregar productos al **carrito de compras**.
- Limpiar carrito.
- Finalizar compra y recibir correo con detalle de la compra.

### Rutas principales del backend

**Categorias: `/categories`**

- `GET /` → Listar todas
- `POST /` → Crear (admin)
- `PUT /:id` → Editar (admin)
- `DELETE /:id` → Eliminar (admin)

**Proveedores: `/suppliers`**

- `GET /` → Listar todas
- `POST /` → Crear (admin)
- `PUT /:id` → Editar (admin)
- `DELETE /:id` → Eliminar (admin)

**Prendas: `/clothes`**

- CRUD completo con subida de imágenes y relación con categoría y proveedor.

**Carrito / Compra: `/email/enviar-correo`**

- `POST` → Envía correo de confirmación de compra al usuario.

---

## Contributing

Pull requests son bienvenidos. Para cambios importantes, por favor abre un issue antes de realizar modificaciones.  
Asegúrate de actualizar tests y dependencias según corresponda.

## License

[MIT](https://choosealicense.com/licenses/mit/)
