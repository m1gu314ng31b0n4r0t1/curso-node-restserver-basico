const { Schema, model } = require('mongoose');

//Se define la metadata del usaurio con la cual vamos estar trabajando
const RolShecma = Schema({

    rol: {
        type: String,
        required : [true, 'El rol es obligatorio']
    }

});

module.exports = model( 'Role', RolShecma );