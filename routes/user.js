//Sacamos el router que viene de express
const { Router } = require( 'express' );
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPatch, usuariosPut } = require('../controllers/usuarios');

//Asignamos a variable para poder utilizar
const router = Router();


 // GET  Para el router solo se pasa el nombre de la funcion y el request y response es pasado autoamiticamente por el api
 router.get('/', usuariosGet );

 router.post('/', usuariosPost );

 router.delete('/', usuariosDelete );

 router.patch('/', usuariosPatch );

 //Para recibir parametros en la url
 router.put('/:id', usuariosPut );
   
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