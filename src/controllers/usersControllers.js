const path = require('path');
const fs = require('fs');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname + '../../database/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


const controllers = {

    findByField: (field, text) => {

        let userFound = users.find( user => user[field] === text); // BUSCAR EL USUARIO POR MAIL
      
        return userFound;

        },

    register: (req, res) => {

        res.render('./users/register'); // RENDERIZA LA PAGINA DE REGISTRACION

    },

    store: (req, res) => {

    let validacion = validationResult(req);

        if (validacion.errors.length > 0) {

            res.render('./users/register', {
                errors: validacion.mapped(),
                oldData: req.body
            });
        };

    let userEmailUsed = controllers.findByField('email',req.body.email);

      if(userEmailUsed){

        res.render('./users/register', {
               errors: {email:{
                msg:'Este Email ya esta registrado'}
            },
                oldData: req.body});

        }else{

        let newUser = {
            "id": users[users.length - 1]["id"] + 1,
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "email": req.body.email,
            "password": bcryptjs.hashSync(req.body.password,10),
            "domicilio": req.body.domicilio,
            "celular": req.body.celular,
            "imagen": req.file.filename,
        };

        users.push(newUser);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, '')); 
       
        res.redirect('/'); //GUARDA O CREA AL USUARIO
        
    }

        return true

    },

    findAll: (req, res) => {
            
        res.render('./users/users', {users}); //PAGINA QUE MUESTRA A TODOS LOS USUARIOS

    },

    findForId: (req, res) => {

        let user = users.find(user => user.id == req.params.id);

        res.render('./users/userDetail', {user}); //PAGINA DEL DETALLE DEL USUARIO

    },
    
    delete: (req, res) => {

        let userDelete = req.params.id;

        let user = users.filter(user => user.id != userDelete);

        let userStore = JSON.stringify(user);

        fs.writeFileSync(__dirname + '../../database/users.json', userStore);

        res.redirect('/'); //ELIMINA EL USUARIO

    },

    userEdit: (req, res) => {
        
           let user = users.find(user => user.id == req.params.id);

           res.render('./users/userEdit', {user}); //PAGINA QUE RENDERIZA LA EDICION DEL USUARIO POR SU ID 
       
         },

    update: (req, res) => {

        let user = users.find(user => user.id == req.params.id);

        let newUser = {
            "id": user.id,
            "imagen": req.file.filename,
            "nombre": req.body.nombre,
            "apellido": req.body.apellido,
            "email": req.body.email,
            "password": bcryptjs.hashSync(req.body.password,10),
            "domicilio": req.body.domicilio,
            "celular": req.body.celular,
        };

        let userToEdit = users.map(user => {
            if (newUser.id == user.id) {
                return user = newUser
            }
            return user
        });

        fs.writeFileSync(usersFilePath, JSON.stringify(userToEdit, null, ''))

        res.redirect('/'); // EDITA EL USUARIO POR SU ID 

    },

    login: (req, res) => {

        res.render('./users/login') // RENDERIZA LA PAGINA DEL LOGIN 

    },

    loginProcess: (req,res) => {

        let userToLogin = controllers.findByField("email",req.body.email);

        if(userToLogin){
            let passwordOk = bcryptjs.compareSync(req.body.password, userToLogin.password);
          if(passwordOk){
            req.session.userLogged = userToLogin;

            if(req.body.remember){
                res.cookie('email', req.body.email, { maxAge: 10000 * 30 });
            }
            return res.redirect('./profile');
          }
          return res.render('./users/login', {
            errors:{
                password:{
                    msg: 'Contraseña incorrecta'
                }
            }
        });
        }

        return res.render('./users/login', {
            errors:{
                email:{
                    msg: 'No se encuentra registrado este email'
                }
            }
        });
        
    },

    profile:(req, res) => {
    
        res.render('./users/userProfile', {user:req.session.userLogged});

    },

    logout: (req,res) => {

        res.clearCookie('email');
        req.session.destroy();
        res.redirect('/')

    }

}

module.exports = controllers;