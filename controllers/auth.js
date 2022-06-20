const {request, response} = require('express');

//Importamos modelo de usuario para hacer operaciones sobre el usuario
const Usuario = require('../models/usuario');

//Libreria para encriptar el passwor npm i bcryptjs
const bcryptjs = require('bcryptjs'); 

//Importamos los helpers
const {generarJWT} = require('../helpers/generar-jwt');


const login = async (req = request, res = response) =>{

    const {correo, password} = req.body
    try {

        //Verificar so el email existe
        const usuario = await Usuario.findOne({ correo });

        //console.log(usuario);

        //Verificar so el email existe
        if( !usuario ){
            return res.status(500).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //Si el usuario esta activo
        if( !usuario.estado ){
            return res.status(500).json({
                msg: 'Usuario / Password no son correctos - estado : false'
            })
        }

        //Verficar la contraseña
        //Metdo que compara la contrasela que llega con la que viene en bd de forma sincrona
        const validatePassword = bcryptjs.compareSync(password, usuario.password)

         //Si el usuario esta activo
         if( !validatePassword ){
            return res.status(500).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error critico en el servidor hable con el administrador'
        })
        
    }

    
}

module.exports = {
    login
}