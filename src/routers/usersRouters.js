const express = require('express');
const router = express.Router();

const usersControllers = require('../controllers/usersControllers');
const upload = require('../middlewares/usersMulterMiddleware');
const validations = require('../middlewares/validationRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/register', guestMiddleware, usersControllers.register); //RENDERIZADO DE LA PAGINA DE REGISTRACION
router.post('/register', validations,upload.single('imagen'), usersControllers.store); //CREACION O GUARDADO DEL USUARIO
router.get('/users',authMiddleware, usersControllers.findAll); // TODOS LOS USUARIOS
router.get('/userDetail/:id',authMiddleware, usersControllers.findForId); //DETALLE DEL USUARIO
router.delete('/delete/:id',authMiddleware, usersControllers.delete); //ELIMINACION DEL USUARIO POR SU ID
router.get('/userEdit/:id',authMiddleware, usersControllers.userEdit); //RENDERIZADO DE LA PAGINA DE EDICION DEL USUARIO
router.put('/userEdit/:id',authMiddleware,validations, upload.single('imagen'), usersControllers.update); //ACTUALIZACION DE DATOS DEL USUARIO

router.get('/login', guestMiddleware, usersControllers.login); //RENDERIZADO DE LA PAGINA DEL LOGIN
router.post('/login', usersControllers.loginProcess); //PROCESO DE LOGUEO
router.get('/profile', authMiddleware,usersControllers.profile); //VISTA DEL PERFIL DE SU USUARIO
router.get('/logout', usersControllers.logout); //CIERRE DE SESION DEL USUARIO

module.exports = router; 