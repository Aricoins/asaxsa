# TodoApp

Este es un proyecto de aplicación web de gestión de tareas (todo list) desarrollado con React y Express. Permite a los usuarios crear, leer, actualizar y eliminar tareas.

## Instalación

Para ejecutar la aplicación en tu entorno local, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Aricoins/ToDoApp.git
```

2. Navega al directorio del proyecto:

```bash
cd todoapp
```

3. Instala las dependencias del servidor y del cliente:

```bash
npm install
```

4. Inicia el servidor de desarrollo:

```bash
npm run dev
```

5. Abre tu navegador web y visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

## Estructura del Proyecto

- `client/`: Contiene el código fuente del cliente desarrollado con React.
- `server/`: Contiene el código fuente del servidor desarrollado con Express.
- `public/`: Contiene archivos estáticos que se sirven directamente al cliente.
- `package.json`: Archivo de configuración de npm que especifica las dependencias del proyecto y los scripts de desarrollo.

## Dependencias Principales

### Cliente (React)

- **@reduxjs/toolkit**: Para la gestión del estado de la aplicación.
- **axios**: Para realizar solicitudes HTTP al servidor.
- **antd**: Componentes de interfaz de usuario de Ant Design.
- **react-router-dom**: Para la gestión de rutas en la aplicación.

### Servidor (Express)

- **express**: Marco de aplicación web para Node.js.
- **cors**: Middleware para habilitar el acceso cruzado entre dominios.
- **jsonwebtoken**: Para la autenticación basada en tokens JWT.
- **dotenv**: Para cargar variables de entorno desde un archivo `.env`.

## Scripts Disponibles

- `dev`: Inicia el servidor de desarrollo para el cliente y el servidor.
- `build`: Compila el cliente y el servidor para producción.
- `lint`: Ejecuta ESLint para detectar y corregir problemas de estilo de código.
- `preview`: Vista previa de la compilación de producción.
- `start`: Inicia el servidor de producción.

## Contribuyendo

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit de ellos (`git commit -am 'Añade nueva característica'`).
4. Sube la rama (`git push origin feature/nueva-caracteristica`).
5. Abre una solicitud de extracción en GitHub.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.

---

¡Gracias por utilizar TodoApp! 

Login: {"email":"frontend.lilhorse@yopmail.com","password":"123456"}