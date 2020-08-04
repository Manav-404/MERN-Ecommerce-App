import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import SignIn from "./user/Signin";
import AdminRoutes from "./auth/helper/AdminRoutes";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import CartPage from "./core/Cart";

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home}></Route>
				<Route exact path="/signup" component={Signup}></Route>
				<Route exact path="/signin" component={SignIn}></Route>
				<Route exact path="/cart" component={CartPage}></Route>
				<PrivateRoutes
					exact
					path="/user/dashboard"
					component={UserDashboard}
				></PrivateRoutes>
				<AdminRoutes
					exact
					path="/admin/dashboard"
					component={AdminDashboard}
				></AdminRoutes>
				<AdminRoutes
					exact
					path="/admin/create/category"
					component={AddCategory}
				></AdminRoutes>
				<AdminRoutes
					exact
					path="/admin/create/product"
					component={AddProduct}
				></AdminRoutes>
				<AdminRoutes
					exact
					path="/admin/product"
					component={ManageProducts}
				></AdminRoutes>
				<AdminRoutes
					exact
					path="/admin/product/update/:productId"
					component={UpdateProduct}
				></AdminRoutes>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
