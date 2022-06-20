//Para que me lea el response con todas sus propiedades
const { response, request  } = require('express');

//Libreria para encriptar el passwor npm i bcryptjs
const bcryptjs = require('bcryptjs'); 

//Se importa modelo de usuario para hacer la percistencia de la informacion en el request del servicio
//Es un estandar que con la primera letra en mayusculas hacemos instancias del modelo
const Usuario = require('../models/usuario');

//Para vericar las validaciones de  express-validator
const {validationResult} = require('express-validator')


const usuariosGet = async (req = request, res = response)  =>{

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true} ;

    //const usuarios = await Usuario.find( { estado: true} )
    /*const usuarios = await Usuario.find( query )
        //desde 
        .skip( Number( desde ) )
        //Para poner un limite 
        .limit( Number( limite ) );
    */

    //Para obtener el total de usaurios
    //const totalUsuarios = await Usuario.countDocuments( { estado: true} );
    //const totalUsuarios = await Usuario.countDocuments( query );

    //Para obtener los query params 
    const queryParams = req.query ;

    const { q, nombre = 'No mame', key, page = 1} = req.query ;

    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    /*res.status(200).json({
        ok:true,
        msg:'get API usuariosGet - controlador',
        //queryParams
        q, nombre, key, page
    });
    */

    //Para ejecutar en paralelo las peticiones y se espera hasta que termine todas las promesas
    const [ totalUsuarios, usuarios ] = await Promise.all(
        [
            Usuario.countDocuments( query ),
            Usuario.find( query )
            //desde 
            .skip( Number( desde ) )
            //Para poner un limite 
            .limit( Number( limite ) )
        ]
    )

     res.status(200).json({
        totalUsuarios,
        usuarios
    });

    


};


// PUT 
const usuariosPut = async (req, res)  =>{
    
    //Capturametros enviados desde la url del servicio ya que express los parsea y te los porporciona en los params
    const { id } = req.params;

    //Informacion que no queremos actualizar  password  google mas la que si queremos restoInformacion
    //Sacamos el correo por que es unico y el _id porque no se puede actualizar
    const { _id, password, google, correo, ...restoInformacion } = req.body;


    //Validacion que el id exista contra DB
    //Si el password existe tendremos que encriptarlo para guardarlo
    if( password ) {
        //Encriptar la contraseña. Inicalizamos el numero de veces que quieres que sea seguro la encriptacion por defectro esta en 10, péro 
        //puedes poner 100 pero taradara mucho mas
        //Se le genera un salt al usuario
        const salt = bcryptjs.genSaltSync();

        //Se encriptar el password con la contraseña mas el salty
        restoInformacion.password =  bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id,  restoInformacion );

    //Capturametros enviados desde la url del servicio ya que express los parsea y te los porporciona en los params
    //const id = req.params.id;
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    /*res.status(200).json({
        ok:true,
        msg:'PUT API usuariosPut - controlador',
        id
    })*/

    res.status(200).json({
        usuario
    })
  }

// POST   convertiomos en asincrona la funcion para poder esperar el await al guardar en la base de datos
const usuariosPost = async  (req, res)  =>{

    
    /* se crea un middleware personalizado en la carpeta de middlewares para la validacion de los campos y el retorno de los errores 
    //Regresa in arreglo con todos las validaciones realizadad en el router con los middlewares de  express-validator
    const erros =  validationResult(req);


    if( !erros.isEmpty() ){
        return res.status(400).json(erros);
    }

    */

    //const body = req.body;

    //Datos obligatios en el schema usuario
    const { nombre, correo, password, rol } = req.body;

    //Se inicializa el usuario con los datos provenientes del body
    const usaurio = new Usuario( { nombre, correo, password, rol }  );

    /*
    //Verificar si el correo existe
    const existEmail = await Usuario.findOne({ correo });

    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>', existEmail);
    
    if( existEmail ){
        return res.status(400).json({
            msg:'Ese correo ya esta registrado', 
        });
    }

    */
    //Encriptar la contraseña. Inicalizamos el numero de veces que quieres que sea seguro la encriptacion por defectro esta en 10, péro 
    //puedes poner 100 pero taradara mucho mas
    //Se le genera un salt al usuario
    const salt = bcryptjs.genSaltSync();

    //Se encriptar el password con la contraseña mas el salty
    usaurio.password = bcryptjs.hashSync( password, salt );


   // console.log('>>>>>>>>>>>>>>>>>>>>>>>>', usaurio);

    //Guardamos en la BD
    //Usamos await para esperar la respuesta de la bd y convertiomos en asincrona la funcion para poder esperar el await
    await usaurio.save();

    //const usaurio = new Usuario( body );

    // console.log(body)
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    //Desestructurando del body request
   // const { nombre , edad } = req.body;
    res.status(200).json({
        msg:'post API usuariosPost - controlador', 
        usaurio
        /*ok:true,
        nombre, edad*/
    })
  }

// DELETE 
const usuariosDelete = async (req, res)  =>{

    //Obtenemos el idenmtifcador que viene de la req uid que agregamos al validar el token del usuario 

    const uid = req.uid;

    //Recuperamos el usuario auntenticado
    const usaurioAutenticado = req.usuario;

    //Capturametros enviados desde la url del servicio ya que express los parsea y te los porporciona en los params
    const { id } = req.params;

    //Usuario Auntenticado


    //Para borrar el usuario fisicamente de la coleccion NO recomendable
    //const usuario = await  Usuario.findByIdAndDelete( id );

    //Borrado logico
    const usuario = await  Usuario.findByIdAndUpdate( id, { estado : false} );


    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
   // res.status(200).json({usuario, usaurioAutenticado});
    res.status(200).json({usuario});
  }

// PATCH 
const usuariosPatch = (req, res)  =>{
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'patch API usuariosPatch - controlador'
    })
  }

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPatch,
    usuariosPost

}