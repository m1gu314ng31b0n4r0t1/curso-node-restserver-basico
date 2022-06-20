//Sacamos el router que viene de express
const { Router } = require( 'express' );
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPatch, usuariosPut } = require('../controllers/usuarios');

// Se importa de los helpers
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

//Middlewares
//const { validarCampos } = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

//Para importar todos los middlewares de una forma mas ordenanda se agrega un index con todos los middlewares de la aplicacion
const {
    validarCampos, 
    validarJWT, 
    esAdminRole, 
    tieneRole  
} = require('../middlewares/index');

const Role = require('../models/rol');

//Asignamos a variable para poder utilizar
const router = Router();


 // GET  Para el router solo se pasa el nombre de la funcion y el request y response es pasado autoamiticamente por el api
 router.get('/', 
    [validarJWT],
    usuariosGet );



 //Para definir los middlewares que van a validar el request de la petcion se pone en la segundo argumento con el combre del middleware si van a mandar mas 
 //de 1 se manda un arreglo con todos los middlewares
 router.post('/', [

    
    //Check de 'express-validator' para validar correo, nombre, rol, password y revisar si es un mail valido
    check('correo', 'El correo no es valido').isEmail(),

    //Para mandar a llamar la validacion del helper
    check('correo').custom( existeEmail ),

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),

    /*
    check('rol').custom( async ( rol = '') =>{

        //Buscar en la DB de Mongo
        const existRole = await Role.findOne({  rol });

       // console.log( 'Rolllllllll >>>>>>>>>', existRole);
        if( !existRole ) {
            throw new Error(`El rol ${ rol } no esta defido en la BD`);
        }
    }),
    */

    //Utilizando los helpers para que quede mas limpio el codigo
    check('rol').custom( esRolValido ),

    check('password', 'La contraseña debe de ser de mas de 6 letras').isLength( {min: 6} ),
    //Se le pasan los argumentos req, res, mas la siguiente funcion que se debe de ejecutar en este caso usuariosPost ojo que la llamada es solo con el nombre No como una funcion
    validarCampos
    
 ] , usuariosPost );

 router.delete('/:id',[
    //El primer middleware en ejecutarse debe se el JWT
     validarJWT,
     //Para verficar el rol del usaurio
     //esAdminRole,
     tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
     check('id', 'No es un id valido').isMongoId(),
     check('id').custom( existeUsuarioPorId ),
     validarCampos
    ],
    usuariosDelete );

 router.patch('/', usuariosPatch );

 //Para recibir parametros en la url
 router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos, 
    ],  usuariosPut );
   
    /*
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'get API'
    })
  })

  // PUT 
router.put('/', (req, res)  =>{
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'PUT API'
    })
  })

  // POST 
router.post('/', (req, res)  =>{
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(500).json({
        ok:true,
        msg:'post API'
    })
  })

  // DELETE 
router.delete('/', (req, res)  =>{
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'delete API'
    })
  })

      // PATCH 
router.patch('/', (req, res)  =>{
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'patch API'
    })
  })

  */

module.exports = router;