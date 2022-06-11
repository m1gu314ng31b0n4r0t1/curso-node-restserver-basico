const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) =>{
    //Regresa in arreglo con todos las validaciones realizadad en el router con los middlewares de  express-validator
    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        //Status 400 para indicar que fue un fallo
        return res.status(400).json(errors);
    }

    // Funcion que se llama cuando el middleware pasa
    next();

};

module.exports = {
    validarCampos 
};