const express = require("express");
const router = express.Router();
const {isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth");
const {getUserById , pushOrderInPurchaseList} = require("../controllers/user");
const {updateStock} = require("../controllers/product");
const {getOrderById , createOrder , getAllOrders , updateStatus , getOrderStatus} = require("../controllers/order");

router.param("orderId" , getOrderById);
router.param("userId" , getUserById)

router.post("/order/:userId" , isSignedIn , isAuthenticated , pushOrderInPurchaseList , updateStock , createOrder);

router.get("/orders/all/:userId" , isSignedIn , isAuthenticated , isAdmin , getAllOrders);

router.get("/orders/status/:userId" , isSignedIn , isAuthenticated , isAdmin , getOrderStatus);
router.put("/orders/:orderId/status/:userId" , isSignedIn , isAuthenticated , isAdmin , updateStatus)






module.exports = router;

