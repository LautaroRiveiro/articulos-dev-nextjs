Tarea:
Hacer una APP en NextJs
- Persistencia en MongoDB
- Usar Mongoose
- API routes (CRUD)
- Context + Reducer
- Una página que cargue todos los items (client side)
- Una página individual por items (server side props)
- Material UI


# CRUD con NextJS
CRUD para guardar artículos sobre desarrollo web, realizado en Next.Js y MongoDB con el objetivo de practicar principalmente ServerSideProps.

## Tecnologías
- [Next.js 12](https://nextjs.org/)
- React 18
- Typescript
- [Material UI 5.6.4](https://mui.com/)
- MongoDB
- [Mongoose 6.3.2](https://mongoosejs.com/)
- [Mongo Atlas](https://www.mongodb.com/atlas/database)


## Idea
Proyecto de práctica aplicando lo explicado en curso [Next.js: El framework de React para producción (Fernando Herrera)](https://www.udemy.com/course/nextjs-fh/), secciones 7 a 10.


## Demo
[https://articulos-dev-nextjs.vercel.app/](https://articulos-dev-nextjs.vercel.app/)


## Comandos
Para correr localmente, se necesita la base de datos.
```
docker-compose up -d
```
* El -d, significa __detached__


### Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/articulosdevdb
```

* Reconstruir los módulos de node y levantar Next
```
npm install
npm run dev
```

### Llenar la base de datos con información de pruebas
Llamar a:
```
http://localhost:3000/api/articulos/seed
```