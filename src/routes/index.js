const router = require('express').Router();
const authenticate = require('../middlewares/authenticate'); 

const userController = require('../controllers/user');

// router.get('/', (req, res) => res.json({sucess:'ok'}));

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.get('/user/:id', authenticate.validateToken, userController.getUsers);

module.exports = router;