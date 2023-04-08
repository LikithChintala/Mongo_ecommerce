const cartModel = require('../models/Cart');
const productModel = require("../models/Product");


module.exports= {
    getCart: async (req, res) => {
        if (req.cookies.user) {
            const userId = req.cookies.user._id;
            const items = await cartModel.find({
                userId: userId
            });
            let products = [];
            if (items.length > 0) {
                for (let i = 0; i < items[0].products.length; i++) {
                    const product = await productModel.findByIdAndUpdate(
                        items[0].products[i].productId,
                        {
                            $set: req.body,
                        },
                        { new: true }
                    );
                    if (product) {
                        products.push(product);
                    }
                }
            }
            res.render('cart.ejs', {cart: products});
        } else {
            res.render('/');
        }
    },
    addCart: async (req, res) => {
        let cart = await cartModel.find({
            userId: req.body.userId
        });
        if(cart.length === 0) {
            cart = new cartModel(req.body);
        } else {
            cart = cart[0];
            cart.products.push({productId: req.body.products[0].productId, quantity: 1})
        }

        try {
            const savedCart = await cart.save();
            res.redirect('/cart');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}



