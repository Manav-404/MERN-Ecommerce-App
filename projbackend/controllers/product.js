const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
	Product.findById(id)
		.populate("category")
		.exec((err, prod) => {
			if (err) {
				return res.status(400).json({
					error: "Could not find the product you are looking for",
				});
			}
			req.product = prod;
			next();
		});
};

exports.createProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, feilds, file) => {
		if (err) {
			res.status(400).json({
				error: "Problem uploading the image",
			});
		}

		const { name, description, category, price, stock } = feilds;

		if (!name || !description || !category || !price || !stock) {
			return res.status(400).json({
				error: "All feilds are compulsory.",
			});
		}

		let product = new Product(feilds);

		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "The size of the file is more than 3MB ",
				});
			}

			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;

			product.save((err, product) => {
				if (err) {
					res.status(400).json({
						error: "Problem in saving the product",
					});
				}

				return res.json(product);
			});
		}
	});
};

exports.getProduct = (req, res) => {
	req.product.photo = undefined;
	return res.json(req.product);
};

exports.photo = (req, res, next) => {
	if (req.product.photo.data) {
		res.set("Content-Type", req.product.photo.type);
		res.send(req.product.photo.data);
		next();
	}
};

exports.deleteProduct = (req, res) => {
	let product = req.product;
	product.remove((err, product) => {
		if (err) {
			res.status(400).json({
				error: `Failed to delete the product ${product.name}`,
			});
		}

		return res.json({
			message: "Deleted successfully",
			product,
		});
	});
};

exports.updateProduct = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, feilds, file) => {
		if (err) {
			return res.status(400).json({
				error: "Problem uploading the image",
			});
		}

		let product = req.product;
		product = _.extend(product, feilds);

		if (file.photo) {
			if (file.photo.size > 3000000) {
				return res.status(400).json({
					error: "The size of the file is more than 3MB ",
				});
			}
			product.photo.data = fs.readFileSync(file.photo.path);
			product.photo.contentType = file.photo.type;
		}

		product.save((err, product) => {
			if (err) {
				return res.status(400).json({
					error: "Problem in updating the product",
				});
			}

			return res.json(product);
		});
	});
};

exports.getAll = (req, res) => {
	let limit = req.query.limit ? parseInt(req.query.limit) : 8;
	let sortBy = req.query.sort ? parseInt(req.query.sort) : "_id";

	Product.find()
		.populate("category")
		.select("-photo")
		.sort([[sortBy, "asc"]])
		.limit(limit)
		.exec((err, products) => {
			if (err) {
				return res.status(400).json({
					error:
						"There are no products to show . We will get that up and running soon.",
				});
			}

			return res.json(products);
		});
};

exports.updateStock = (req, res, next) => {
	let ops = req.body.order.products.map((prod) => {
		return {
			updateOne: {
				filter: { _id: prod._id },
				update: { $inc: { stock: -prod.count, sold: +prod.count } },
			},
		};
	});

	Product.bulkWrite(ops, {}, (err, products) => {
		if (err) {
			return res.status(400).json({
				error: "Bulk operation failed",
			});
		}

		next();
	});
};

exports.getAllUniqueCategories = (req, res) => {
	Product.distinct("category", {}, (err, categories) => {
		if (err) {
			return res.status(400).json({
				error: "No categories found",
			});
		}

		return res.json(categories);
	});
};
