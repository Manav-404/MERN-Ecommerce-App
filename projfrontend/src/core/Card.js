import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { add, removeItemFromCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";

const Card = ({
	product,
	addToCart = true,
	removeFromCart = false,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const addToCartt = () => {
		add(product, () => {
			setRedirect(true);
		});
	};

	const getRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={addToCartt}
					className="btn btn-block btn-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = (removeFromCart) =>
		removeFromCart && (
			<button
				onClick={() => {
					removeItemFromCart(product._id);
					setReload(!reload);
				}}
				className="btn btn-block btn-danger mt-2 mb-2"
			>
				Remove from cart
			</button>
		);

	return (
		<div className="card ">
			<div className="card-header lead">{product.name}</div>
			<div className="card-body">
				{getRedirect(redirect)}
				<ImageHelper product={product} />
				<p className="lead  font-weight-normal text-wrap">
					{product.description}
				</p>
				<p className="btn rounded  btn-sm px-4">${product.price}</p>
				<div className="row">
					<div className="col-12">{showAddToCart(addToCart)}</div>
					<div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
