
//Importamos modelo de usuario para hacer operaciones sobre el usuario
const Usuario = require('../models/usuario');

const { response, request } = require('express');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');

//Para validar el JWT
const validarJWT = async ( req = request, res = response , next ) =>{
   
    //Extraer el token del Header
    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        //Para verificar el token se debe enviar el troken para la clave privada
        //En caso que no sea valido o sea manipulado se dispara lanza una exception y cae en el catch
        const payload = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        
        //console.log( payload );
        const { uid } = payload;

        //Leer el usuario authenticado por medio del JWT
        const usuario = await  Usuario.findById( uid );

        //Verificar si el usuario no existe
        if( !usuario ){
            return res.status(401).json({
                msg: 'El token no es valido - usuario no existe en DB'
            })
        }

        //Verificar si el usuario tiene el estado true
        console.log('Usuario Logueado' , usuario);

        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'El token no es valido - usuario con estado false'
            })
        }
        
        //Guardar Usuario autenticado ene la request del la peticion para que lo utilice los demas middlewares
        req.usuario = usuario;

        //Se le anexa la uid al contexto de toda la peticion y por lo tanto los demas midllewares lo tendran
        req.uid = uid;

        //Para que haga la siguiente ejecucion
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg: 'El token no es valido'
        })
    }

    console.log( token );


   
};

module.exports = {
    validarJWT 
};