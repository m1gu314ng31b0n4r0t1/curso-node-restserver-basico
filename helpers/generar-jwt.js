//Impostamos la libreria de JWT
const jwt = require('jsonwebtoken');


//Funancion para generart el JSON WebToken
const generarJWT = ( uid = '' ) =>{

    return new Promise ( ( resolve, reject ) =>{

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn : '4h'
        },  (error, token)=>{
            if( error ){
                console.log( error );
                reject('No se pudo generar el token');
            } else {
                resolve( token );
            }

        } );

    });

}

module.exports = {
    generarJWT
}