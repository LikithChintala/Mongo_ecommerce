const productModel = require('../models/Product');

module.exports= {
    filteredProducts: async (req, res) => {
        let category = 'men';
        if (req.query.category) {
            category = req.query.category
        }
        const products = await productModel.find({
            category: category
        });
        res.render('home.ejs', {products: products,user: req.cookies.user});
    },
    productDetail: async (req, res) => {
        const selectedProduct = await productModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.render('quick-view.ejs', {product: selectedProduct,user: req.cookies.user});
    },
    addProduct: async (req, res) => {
        const newProduct = new productModel(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}



