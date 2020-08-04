const express = require("express");
const router = express.Router();
const {getCategoryById , createCategory , getCategory , getCategories , updateCategory ,deleteCategory} = require("../controllers/category");
const { isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth");
const { getUserById} = require("../controllers/user");

router.param("userId" ,getUserById);
router.param("categoryId" , getCategoryById);


router.post("/category/create/:userId" , 
isSignedIn , 
isAdmin , 
isAuthenticated , 
createCategory)


router.get("/category/:categoryId" , getCategory);
router.get("/categories" , getCategories);


router.put("/category/:categoryId/:userId" ,isSignedIn , isAuthenticated , isAdmin ,  updateCategory);

router.delete("/category/:categoryId/:userId" ,isSignedIn , isAuthenticated , isAdmin ,  deleteCategory);




module.exports = router;