//Para que me lea el response con todas sus propiedades
const { response, request  } = require('express');

const usuariosGet = (req = request, res = response)  =>{

    //Para obtener los query params 
    const queryParams = req.query ;

    const { q, nombre = 'No mame', key, page = 1} = req.query ;

    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'get API usuariosGet - controlador',
        //queryParams
        q, nombre, key, page
    });
};


// PUT 
const usuariosPut = (req, res)  =>{

    //Capturametros enviados desde la url del servicio ya que express los parsea y te los porporciona en los params
    const id = req.params.id;
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'PUT API usuariosPut - controlador',
        id
    })
  }

// POST  
const usuariosPost =  (req, res)  =>{

    const body = req.body;
    // console.log(body)
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    //Desestructurando del body request
    const { nombre , edad } = req.body;
    res.status(500).json({
        ok:true,
        msg:'post API usuariosPost - controlador',
        nombre, edad
    })
  }

// DELETE 
const usuariosDelete = (req, res)  =>{
    //Para manejo de errores HTTP con la funcion status(200) + el codigo de http
    res.status(200).json({
        ok:true,
        msg:'delete API usuariosDelete - controlador'
    })
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