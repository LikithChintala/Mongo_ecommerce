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
                res.render('cart.ejs', {cart: {id: items[0]._id, products: products}, user: req.cookies.user});
            }
            res.render('cart.ejs', {cart: {products: []}, user: req.cookies.user});
        } else {
            res.render('/');
        }
    },
    addCart: async (req, res) => {
        let userId = req.cookies.user && req.cookies.user._id;
        if (req.body.userId) {
            userId = req.body.userId;
        }
        let cart = await cartModel.find({
            userId: userId
        });
        if(cart.length === 0) {
            const payload = {
                "userId": userId,
                "products": [
                    {
                        "productId": req.body.productId,
                        "quantity": 1
                    }
                ],
            }
            cart = new cartModel(payload);
        } else {
            cart = cart[0];
            cart.products.push({productId: req.body.productId, quantity: 1})
        }

        try {
            const savedCart = await cart.save();
            res.redirect('/cart');
        } catch (err) {
            res.status(500).json(err);
        }
    }
}



