import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const CartPage = () => {
	const [reload, setReload] = useState(false);

	useEffect(() => {
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = () => {
		return (
			<div>
				{products.map((product, index) => {
					return (
						<Card
							key={index}
							product={product}
							addToCart={false}
							removeFromCart={true}
							setReload={setReload}
							reload={reload}
						/>
					);
				})}
			</div>
		);
	};
	const loadCheckout = () => {
		return <div></div>;
	};

	const [products, setProducts] = useState([]);

	return (
		<Base title="Shopping Cart" description="Ready to checkout ?">
			<div className="row text-center">
				<div className="col-6">{loadAllProducts()}</div>
				<div className="col-6">{loadCheckout()}</div>
			</div>
		</Base>
	);
};

export default CartPage;
