import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { create } from "./helper/adminapicall";

const AddCategory = () => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const { user, token } = isAuthenticated();

	const goBack = () => {
		return (
			<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
				Home
			</Link>
		);
	};

	const handleChange = (event) => {
		setError("");
		setName(event.target.value);
	};

	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Added a new category</h4>;
		}
	};

	const warningMessage = () => {
		if (error) {
			return <h4 className="text-danger">Failed to create category</h4>;
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		create(user._id, token, { name })
			.then((data) => {
				if (error) {
					setError(true);
				} else {
					setError(false);
					setSuccess(true);
					setName("");
				}
			})
			.catch((err) => setError(true));
	};

	const categoryForm = () => {
		return (
			<form>
				<div className="form-group">
					<p>Category Name</p>
					<input
						type="text"
						className="form-control my-3"
						onChange={handleChange}
						value={name}
						autoFocus
						required
						placeholder="For eg . Summer"
					/>
					<button className="btn btn-outline-success" onClick={onSubmit}>
						Create Category
					</button>
				</div>
			</form>
		);
	};

	return (
		<Base
			title="Create Category"
			description="Add a new category for designs"
			className="container panel panel-heading "
		>
			<div className="row rounded">
				<div className="col-md-8 offset-md-2">
					{successMessage()}
					{warningMessage()}
					{categoryForm()}
					{goBack()}
				</div>
			</div>
		</Base>
	);
};

export default AddCategory;
