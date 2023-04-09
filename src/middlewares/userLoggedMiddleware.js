// FUNCION DONDE SE GUARDA LOS DATOS EN SESSION PARA SER ACCEDIDOS EN TODA LA APLICACION, MAS OPCION DE RECORMARME EN COOKIES.

const controllers = require("../controllers/usersControllers");



function userLoggedMiddleware(req,res,next){

    res.locals.isLogged = false;

    let emailInCookie = req.cookies.email;
    let userFromCookie = controllers.findByField('email', emailInCookie);
    
    if(userFromCookie){
        req.session.userLogged = userFromCookie;
        }
    if(userFromCookie && userFromCookie.rol  == "admin"){
        res.locals.admin = true;
}
    if(req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    };

    next();

}

module.exports = userLoggedMiddleware; 
