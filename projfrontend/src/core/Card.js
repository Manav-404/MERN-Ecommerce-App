import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addToCart = true, removeFromCart = false }) => {
	const showAddToCart = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={() => {}}
					className="btn btn-block btn-success mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = (removeFromCart) =>
		removeFromCart && (
			<button onClick={() => {}} className="btn btn-block btn-danger mt-2 mb-2">
				Remove from cart
			</button>
		);

	return (
		<div className="card ">
			<div className="card-header lead">{product.name}</div>
			<div className="card-body">
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
