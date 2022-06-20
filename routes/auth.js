const { Router } = require( 'express' );
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

//Asignamos a variable para poder utilizar
const router = Router();


 // POST  Para el router solo se pasa el nombre de la funcion y el request y response es pasado autoamiticamente por el api
 router.post('/login', [
    check('correo', 'El correo es obligatoria').isEmail(),
    validarCampos
 ],
  login);



 module.exports = router;