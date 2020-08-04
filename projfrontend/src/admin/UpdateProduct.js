import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
	getCategories,
	createProduct,
	getProduct,
	updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		updatedProduct: "",
		getRedirect: false,
		formData: "",
	});

	const {
		name,
		description,
		price,
		stock,
		categories,
		category,
		loading,
		error,
		updatedProduct,
		getRedirect,
		formData,
	} = values;

	const preload = (productId) => {
		getProduct(productId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				preloadCategories();
				setValues({
					...values,
					name: data.name,
					description: data.description,
					price: data.price,
					category: data.category._id,
					stock: data.stock,
					formData: new FormData(),
				});
			}
		});
	};

	const preloadCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					categories: data,
					formData: new FormData(),
				});
			}
		});
	};

	useEffect(() => {
		preload(match.params.productId);
	}, []);

	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<div
						className="alert alert-success"
						style={{ display: updatedProduct ? "" : "none" }}
					>
						{updatedProduct} updated successfully !
					</div>
				</div>
			</div>
		);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: "", loading: true });
		updateProduct(match.params.productId, user._id, token, formData).then(
			(data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					setValues({
						...values,
						error: "",
						name: "",
						description: "",
						price: "",
						photo: "",
						stock: "",
						loading: false,
						updatedProduct: data.name,
						category: "",
					});
				}
			},
		);
	};

	const handleChange = (name) => (event) => {
		const value = name == "photo" ? event.target.files[0] : event.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value });
	};

	const updateProductForm = () => (
		<form>
			<span>Post photo</span>
			<div className="form-group">
				<label className="">
					<input
						onChange={handleChange("photo")}
						type="file"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("name")}
					type="text"
					className="form-control"
					placeholder="Name"
					value={name}
				/>
			</div>
			<div className="form-group">
				<textarea
					onChange={handleChange("description")}
					type="text"
					className="form-control"
					placeholder="Description"
					value={description}
				/>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("price")}
					type="number"
					className="form-control"
					placeholder="Price"
					value={price}
				/>
			</div>
			<div className="form-group">
				<select
					onChange={handleChange("category")}
					className="form-control"
					placeholder="Category"
				>
					<option>Select</option>
					{categories &&
						categories.map((category, index) => (
							<option key={index} value={category._id}>
								{category.name}
							</option>
						))}
				</select>
			</div>
			<div className="form-group">
				<input
					onChange={handleChange("stock")}
					type="number"
					className="form-control"
					placeholder="Quantity"
					value={stock}
				/>
			</div>

			<button
				type="submit"
				onClick={onSubmit}
				className="btn btn-outline-success mb-3"
			>
				Update Product
			</button>
		</form>
	);

	return (
		<Base
			title="Update product"
			description="Edit a product"
			className="container p-4"
		>
			<div className="row rounded">
				<div className="col-md-8 offset-md-2">
					{errorMessage()}
					{successMessage()}
					{updateProductForm()}
				</div>
			</div>
			<Link
				className="btn btn-sm btn-success mb-3"
				style={{ marginLeft: 190 }}
				to="/admin/dashboard"
			>
				Home
			</Link>
		</Base>
	);
};

export default UpdateProduct;
