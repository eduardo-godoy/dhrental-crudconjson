// VALIDACIONES DEL PROCESO DE REGISTRACION DEL USUARIO

const { body } = require('express-validator');

const validations = [

    body('nombre').notEmpty().withMessage('Debes completar este campo'),
    body('apellido').notEmpty().withMessage('Debes completar este campo'),
    body('email').notEmpty().withMessage('Tienes que escribir un correo electrónico').bail().isEmail().withMessage('Debe ser un formato de correo válido'),
    body('password').notEmpty().withMessage('Debes completar este campo').bail().isLength({min:6}).withMessage('La contraseña debe tener un minimo de 6 caracteres'),
    body('domicilio').notEmpty().withMessage('Debes completar este campo'),
    body('celular').notEmpty().withMessage('Debes completar este campo').bail().isLength({min:10}).withMessage('El telefono debe tener un minimo de 10 caracteres numericos'),
    body('domicilio').notEmpty().withMessage('Debes completar este campo'),
    body('imagen').custom((value,{ req })=>{

        let file = req.file;
        
        if(!file){
            throw new Error('Tienes que subir una imagen');
        }else{
            return true
        }
    })
]

module.exports = validations;