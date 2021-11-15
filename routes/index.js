const express = require('express');
const router = express.Router();
const ListController = require('../controllers/ListController');
const { login } = require('../controllers/UserController')
const { checkToken } = require('../middlewares/auth')
const errorHandler = require('../middlewares/errors')
const { saveToken, handlePushTokens } = require('../middlewares/pushNotification')


router.post('/login', login)

router.get("/", (req, res) => {
    res.send("App running");
});


router.get('/products',
    checkToken,
    errorHandler.catchAsync(ListController.getProducts)
)

router.get('/products/:id',
    checkToken,
    errorHandler.catchAsync(ListController.getProductsById)
)

router.post('/addProduct',
    checkToken,
    errorHandler.catchAsync(ListController.addNewProduct)
)

router.post('/updateProduct',
    checkToken,
    errorHandler.catchAsync(ListController.updateProduct)
)


router.post("/token", (req, res) => {
    saveToken(req.body.token);
    res.send(`Received token ${req.body.token}`);
});

router.post("/message", (req, res) => {
    handlePushTokens(req.body);
    res.send(`Received hash: ${req.body.hash}`);
});




module.exports = router;
