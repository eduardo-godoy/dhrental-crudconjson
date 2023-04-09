//FUNCION SI EL USUARIO NO ESTA LOGUEADO NO PUEDE VER ALGUNAS COSAS HASTA LOGUEARSE O REGISTRARSE

function authMiddleware(req,res,next){
    if(!req.session.userLogged){
    res.redirect('/users/login');
    }
    next();
};

module.exports = authMiddleware;