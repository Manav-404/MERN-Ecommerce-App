import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);

	const loadAllProducts = () => {
		getProducts().then((data) => {
			if (data.error) {
				setError(true);
			} else {
				setProducts(data);
			}
		});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);
	return (
		<Base
			title="Welcome to Dez!!!"
			description="Your one stop solution for all your design needs"
		>
			<div className="row">
				{products.map((product, index) => {
					return (
						<div key={index} className="col-4">
							<Card product={product} />
						</div>
					);
				})}
			</div>
		</Base>
	);
};

export default Home;
