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
        res.render('home.ejs', {products: products});
    },
    addProduct: async (req, res) => {
        // router.post("/", verifyTokenAndAdmin, async (req, res) => {
        const newProduct = new productModel(req.body);
        try {
            const savedProduct = await newProduct.save();
            res.status(200).json(savedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    }

// //UPDATE
// router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json(updatedProduct);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.status(200).json("Product has been deleted...");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
//
// //GET PRODUCT
// router.get("/find/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
}



