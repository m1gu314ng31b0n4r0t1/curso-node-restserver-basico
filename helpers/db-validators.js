const Role = require('../models/rol');

const Usuario = require('../models/usuario');


const esRolValido = async( rol = '') =>{

    //Buscar en la DB de Mongo
    const existRole = await Role.findOne({  rol });

   // console.log( 'Role >>>>>>>>>', existRole);
    if( !existRole ) {
        throw new Error(`El rol ${ rol } no esta defido en la BD`);
    }
};

const existeEmail = async( correo = '') =>{


     //Verificar si el correo existe
     const existEmail = await Usuario.findOne({ correo });

     if( existEmail ){
        throw new Error(`El correo ${ correo } ya esta registrado en el sistema`);
    }
    
};

const existeUsuarioPorId = async( id = '') =>{
    //Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);

    if( !existeUsuario ){
       throw new Error(`El usuario ${ id } no existe en el sistema`);
   }
   
};


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}