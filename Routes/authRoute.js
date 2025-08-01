express = require('express');
const router = express.Router();
const authControllers = require('../Controllers/authController')
const rules = require('../Utils/rules')


router.post(
    '/signup', 
    [rules.name, rules.email, rules.password],
    authControllers.signUp
)


router.post(
    '/signin',
    [rules.email, rules.password], 
    authControllers.signIn
)



module.exports = router;
