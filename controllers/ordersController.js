const orderModel = require('../models/Order');

module.exports= {
    orders: async (req, res) => {

        try {
            const orders = await orderModel.find({ userId: '6431d17b7aff85eed5784eab' });
            // res.status(200).json(orders);
            res.render('orders.ejs', {orders: orders});

          } catch (err) {
            res.status(500).json(err);
          }

    },

     createOrder: async (req, res) => {
        //  router.post("/", async (req, res) => {
            const newOrder = new orderModel(req.body);

            try {
              const savedOrder = await newOrder.save();
              res.status(200).json(savedOrder);
            } catch (err) {
              res.status(500).json(err);
            }
    },

    // getOrders : async(req,res) =>{
    //     try {
    //         const orders = await orderModel.find({ userId: req.params.userId });
    //         res.status(200).json(orders);
    //         res.render('orders.ejs', {orders: orders});

    //       } catch (err) {
    //         res.status(500).json(err);
    //       }
    // }

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



