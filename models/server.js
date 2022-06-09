const express = require('express');
var cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Para adminstrar la ruta de nuestro servicio
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes(); 

    }

    routes(){

        //Peticion de /api/usuarios van a despacharse de  ../routes/user, esta  /api/usuarios la tendran todos los routers si quieres agrear mas en cada peticio ejemplo
        //creaUsario entonces quedaria /api/usuarios/creaUsario
        //this.app.use('/api/usuarios', require('../routes/user'));
        this.app.use(this.usuariosPath, require('../routes/user'));

        /*
        //OJO accedemos al app con el this para peticion GET 
        this.app.get('/api', (req, res)  =>{
            //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
            res.status(200).json({
                ok:true,
                msg:'get API'
            })
          })

          //OJO accedemos al app con el this para peticion PUT 
        this.app.put('/api', (req, res)  =>{
            //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
            res.status(200).json({
                ok:true,
                msg:'PUT API'
            })
          })

          //OJO accedemos al app con el this para peticion POST 
        this.app.post('/api', (req, res)  =>{
            //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
            res.status(500).json({
                ok:true,
                msg:'post API'
            })
          })

          //OJO accedemos al app con el this para peticion DELETE 
        this.app.delete('/api', (req, res)  =>{
            //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
            res.status(200).json({
                ok:true,
                msg:'delete API'
            })
          })

              //OJO accedemos al app con el this para peticion PATCH 
        this.app.patch('/api', (req, res)  =>{
            //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
            res.status(200).json({
                ok:true,
                msg:'patch API'
            })
          })

          */
    }

    listen(){
        //OJO accedemos al app con el this
        this.app.listen(this.port, () =>{
            console.log('Servidor corriendo en el puerto', this.port )
        });
    }

    middlewares(){
        //Directorio publico
        this.app.use( express.static('public') );

        //Lectura y parseo del body 
        this.app.use( express.json() );

        //CORS Para seguridad, provee seguridad de quien llama a nuestro rest server desde un portal
        this.app.use(cors())
    }
}

module.exports = Server;