const cartRepository = require("./repository");
const { Producto } = require("../model/producto");

exports.addItemToCart = async (req, res) => {
	const { productId } = req.body;
	const quantity = Number.parseInt(req.body.cantidad);
	try {
		let cart = await cartRepository.cart();
        let productDetails = await Producto.findById(productId);
		if (!productDetails) {
			return res.status(500).json({
				type: "Not Found",
				msg: "Invalid request",
			});
		}
		//--If Cart Exists ----
		if (cart) {
			//---- Check if index exists ----
			const indexFound = cart.items.findIndex((item) => item.productoId.id == productId);
			//------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
			if (indexFound !== -1 && quantity <= 0) {
				cart.items.splice(indexFound, 1);
				if (cart.items.length == 0) {
					cart.subTotal = 0;
				} else {
					cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
				}
			}
			//----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
			else if (indexFound !== -1) {
				cart.items[indexFound].cantidad = cart.items[indexFound].cantidad + quantity;
				cart.items[indexFound].total = cart.items[indexFound].cantidad * productDetails.precio;
				cart.items[indexFound].precio = productDetails.precio;
				cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
			}
			//----Check if quantity is greater than 0 then add item to items array ----
			else if (quantity > 0) {
				cart.items.push({
					productoId: productId,
					cantidad: quantity,
					precio: productDetails.precio,
					total: parseInt(productDetails.precio * quantity),
				});
				cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
			}
			//----If quantity of price is 0 throw the error -------
			else {
				return res.status(400).json({
					type: "Invalid",
					msg: "Invalid request",
				});
			}
			let data = await cart.save();
			res.status(200).json({
				type: "success",
				mgs: "Process successful",
				data: data,
			});
		}
		//------------ This creates a new cart and then adds the item to the cart that has been created------------
		else {
			const cartData = {
				items: [
					{
						productoId: productId,
						cantidad: quantity,
						total: parseInt(productDetails.precio * quantity),
						precio: productDetails.precio,
					},
				],
				subTotal: parseInt(productDetails.precio * quantity),
			};
			cart = await cartRepository.addItem(cartData);
			// let data = await cart.save();
			res.json(cart);
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			type: "Invalid",
			msg: "Something went wrong",
			err: err,
		});
	}
};
exports.getCart = async (req, res) => {
	try {
		let cart = await cartRepository.cart();
		if (!cart) {
			return res.status(400).json({
				type: "Invalid",
				msg: "Cart not Found",
			});
		}
		res.status(200).json({
			status: true,
			data: cart,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			type: "Invalid",
			msg: "Something went wrong",
			err: err,
		});
	}
};

exports.emptyCart = async (req, res) => {
	try {
		let cart = await cartRepository.cart();
		cart.items = [];
		cart.subTotal = 0;
		let data = await cart.save();
		res.status(200).json({
			type: "success",
			mgs: "Cart has been emptied",
			data: data,
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			type: "Invalid",
			msg: "Something went wrong",
			err: err,
		});
	}
};
