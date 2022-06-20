/*Modelo
{
    nombre: 'Miguel Maartinez',
    correo:'miguel@correo.com',
    password:'sddfg3443534',
    rol:'Admin',
    img: 'url'
    estado:true,
    google:true
}
*/
const { Schema, model } = require('mongoose');

//Se define la metadata del usaurio con la cual vamos estar trabajando
const UsuarioShecma = Schema({
    nombre: {
        type: String,
        required : [true, 'El nombre es obligarotio']
    }, 
    correo: {
        type: String,
        required : [true, 'El correo es obligarotio'],
        unique : true //Para indicar que el correo es unico
    }, 
    password: {
        type: String,
        required : [true, 'La contraseña es obligarotio']
    }, 
    img: {
        type: String
    },
    rol: {
        type: String,
        required : true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'] //Solo tendra estas dos opciones de valores posibles
    }, 
    estado: {
        type: Boolean,
        default: true
    }, 
    google: {
        type: Boolean,
        default: false
    }, 
});


//Para quitar los parametros que no queremos mostrar sobre escbrimos el metodo toJSON y quitamos mediante desestructuracioon __v, password
UsuarioShecma.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject();

    usuario.uid = _id;

    return usuario;
};

//Mongoose le agregara la S a Usuario para hacerlo plural
module.exports = model( 'Usuario' , UsuarioShecma );